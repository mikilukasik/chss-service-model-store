import { getModelPair } from '../../services/trainingService';

export const createTrainingModelPairHandler = [
  'training:getModelPair',
  async ({ modelName }, comms) => {
    const { currentBest, inTraining } = await getModelPair({ modelName });
    comms.send({ currentBest, inTraining });
  },
];
