import { copyDir } from '../../services/filesService';
import { withDots } from '../../services/trainingService';

export const replaceCurrentBestHandler = [
  'training:replaceCurrentBest',
  async ({ inTraining }, comms) => {
    console.log('replacing');

    const [, , , _modelName] = inTraining.split('__');
    const modelName = withDots(_modelName);

    const newModelName = `models/__currentBest__${Date.now()}__${modelName}`;
    await copyDir({ from: `models/${withDots(inTraining)}`, to: newModelName });

    comms.send('ok');
  },
];
