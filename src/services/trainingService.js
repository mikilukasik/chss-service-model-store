import { copyDir, getModelNames } from './filesService';

export const withoutDots = (str) => str.replace(/\./g, '-dot-').replace(/\$/g, '-dollar-');
export const withDots = (str) => str.replace(/-dot-/g, '.').replace(/-dollar-/g, '$');

const createTrainingModel = async ({ modelName, version }) => {
  const newModelName = `__${version}__${Date.now()}__${modelName}`;

  await copyDir({
    from: `models/${modelName}`,
    to: `models/${newModelName}`,
  });

  return newModelName;
};

const findOrCreateModel = async ({ modelName, modelNames, version }) => {
  const matchingNames = modelNames.filter((name) => {
    const splitName = name.split('__');
    return splitName[1] === version && splitName[3] === modelName;
  });
  const latestName = matchingNames[matchingNames.length - 1];
  if (latestName) return latestName;

  return await createTrainingModel({ modelName, version });
};

export const getModelPair = async ({ modelName: _mn }) => {
  const modelName = withDots(_mn);

  const modelNames = await getModelNames({ withDots: true });
  const currentBest = await findOrCreateModel({ modelName, modelNames, version: 'currentBest' });
  const inTraining = await findOrCreateModel({ modelName, modelNames, version: 'inTraining' });

  return { currentBest: withoutDots(currentBest), inTraining: withoutDots(inTraining) };
};
