import multer from 'multer';
import { copyDir, copyFile, deleteFile } from '../services/filesService';
import { withDots } from '../services/trainingService';
const upload = multer({ dest: 'uploads/' });

import { createTrainingModelPairHandler } from './internal/createTrainingModelPairHandler';
import { replaceCurrentBestHandler } from './internal/replaceCurrentBestHandler';
import { getAllModelNamesHandler } from './modelStoreSocket/getAllModelNamesHandler';

export const initRoutes = ({ msg }) => {
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
