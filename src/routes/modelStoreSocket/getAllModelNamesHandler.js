import { getModelNames } from '../../services/filesService';

export const getAllModelNamesHandler = [
  'getAllModelNames',
  async (data, comms) => {
    const modelNames = await getModelNames(data);
    comms.send(modelNames);
  },
];
