import multer from 'multer';
import cors from 'cors';
import { copyDir, copyFile, deleteFile } from '../services/filesService';
import { withDots } from '../services/trainingService';
import fetch from 'node-fetch';
import fs from 'fs';

import { createTrainingModelPairHandler } from './internal/createTrainingModelPairHandler';
import { replaceCurrentBestHandler } from './internal/replaceCurrentBestHandler';
import { getAllModelNamesHandler } from './modelStoreSocket/getAllModelNamesHandler.js';

const KERAS_MODEL_NAMES_CACHE_TIME = 10000;

let kerasModelNames = [];
let lastUpdated = 0;

const upload = multer({ dest: 'uploads/' });

const pythonLoader = fs.readFileSync('./src/python_loader.js', 'utf-8');

const getKerasModelNames = async () => {
  const now = Date.now();
  if (lastUpdated + KERAS_MODEL_NAMES_CACHE_TIME > now) return kerasModelNames;

  kerasModelNames = (await (await fetch('http://localhost:3600/models')).json()).models; //.map(withoutDots);
  lastUpdated = now;
  return kerasModelNames;
};

export const initRoutes = ({ msg }) => {
  msg.app.use(cors());

  msg.app.use('/models/', async (req, res, next) => {
    const modelName = req.path.slice(1).replace('/loader.js', '');
    kerasModelNames = await getKerasModelNames();

    if (kerasModelNames.includes(modelName)) {
      console.log(`keras model requested: ${modelName}`);
      return res.send(
        pythonLoader.replace('{MODEL_URL}', `http://localhost:3600/predict/${modelName.replace(/\//g, '-slash-')}`),
      );
    }

    next();
  });

  msg.static('/models/', 'models');

  msg.on(...getAllModelNamesHandler);
  msg.on(...createTrainingModelPairHandler);
  msg.on(...replaceCurrentBestHandler);

  const modelStoreSocket = msg.ws('/modelStoreSocket');
  modelStoreSocket.on(...getAllModelNamesHandler);

  msg.on.post('/uploadModel/:modelName', [
    upload.fields([
      {
        name: 'model.json',
        maxCount: 1,
      },
      {
        name: 'model.weights.bin',
        maxCount: 1,
      },
    ]),
    async (req, res) => {
      try {
        const [, version, , _modelName] = req.params.modelName.split('__');
        const modelName = withDots(_modelName);

        const newModelName = `__${version}__${Date.now()}__${modelName}`;
        await copyDir({ from: `models/${modelName}`, to: `models/${newModelName}` });

        for (const fileName of Object.keys(req.files)) {
          const sourceFileName = `uploads/${req.files[fileName][0].filename}`;
          await copyFile({
            from: sourceFileName,
            to: `models/${newModelName}/${fileName}`,
          });
          await deleteFile(sourceFileName);
        }

        res.send('ok');
      } catch (e) {
        console.error(e);
      }
    },
  ]);
};
