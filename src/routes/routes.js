import { getAllModelNamesHandler } from './modelStoreSocket/getAllModelNamesHandler';

export const initRoutes = ({ msg }) => {
  msg.static('/models/', 'models');

  const modelStoreSocket = msg.ws('/modelStoreSocket');

  msg.on(...getAllModelNamesHandler);
  modelStoreSocket.on(...getAllModelNamesHandler);
};
