import { promises as fs } from 'fs';
import path from 'path';
import { withoutDots } from './trainingService';

const USE_SELU = false;

export const copyFile = async ({ from, to }) => {
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
};

export const deleteFile = async (filename) => {
  await fs.unlink(path.resolve(filename));
};

export const copyDir = async ({ from, to }) => {
  await fs.mkdir(to, { recursive: true });
  let entries = await fs.readdir(from, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(from, entry.name);
    let destPath = path.join(to, entry.name);

    entry.isDirectory() ? await copyDir(srcPath, destPath) : await fs.copyFile(srcPath, destPath);
  }
};

export const fileExists = async (filename) => {
  try {
    await fs.stat(filename);
    return true;
  } catch (e) {
    return false;
  }
};

export const getModelNames = async ({ withDots, requiredFiles = ['constants.json'] } = {}) => {
  const validModelNames = [];
  const allFolders = await fs.readdir(`models`);

  for (const folderName of allFolders) {
    try {
      for (const requiredFile of requiredFiles) {
        await fs.stat(`models/${folderName}/${requiredFile}`);
      }

      // if (!USE_SELU) {
      //   const modelContents = await fs.readFile(`models/${folderName}/model.json`, 'utf8');
      //   if (modelContents.indexOf('"activation":"selu"') >= 0) throw 'no selu';
      // }

      // this is so mongo won't cry when the folder name is used as a key in a stored object
      validModelNames.push(withDots ? folderName : withoutDots(folderName));
    } catch (e) {
      // /* */ console.log(e);
    }
  }

  return validModelNames.sort();
};
