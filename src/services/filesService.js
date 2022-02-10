import { promises as fs } from 'fs';

const USE_SELU = false;

export const getModelNames = async () => {
  const validModelNames = [];
  const allFolders = await fs.readdir(`models`);

  for (const folderName of allFolders) {
    try {
      await fs.stat(`models/${folderName}/constants.json`);

      if (!USE_SELU) {
        const modelContents = await fs.readFile(`models/${folderName}/model.json`, 'utf8');
        if (modelContents.indexOf('"activation":"selu"') >= 0) throw 'no selu';
      }
      validModelNames.push(folderName);
    } catch (e) {
      // /* */ console.log(e);
    }
  }

  return validModelNames.sort();
};
