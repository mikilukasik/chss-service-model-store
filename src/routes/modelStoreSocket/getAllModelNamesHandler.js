import { getModelNames } from '../../services/filesService';
import fetch from 'node-fetch';
import { withoutDots } from '../../services/trainingService';

export const getAllModelNamesHandler = [
  'getAllModelNames',
  async (data, comms) => {
    const tfjsModelNames = await getModelNames(data);
    const kerasModelNames = (await (await fetch('http://localhost:3600/models')).json()).models;
    comms.send([...tfjsModelNames, ...kerasModelNames.map(withoutDots)]);
  },
];
