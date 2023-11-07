import KoaRouter from 'koa-router';

import jsonStorageController from '../controllers/jsonStorage.controller.js';

import { routes } from '../constants/routes.js';

const jsonBaseRouter = new KoaRouter();

jsonBaseRouter.get(routes.qFileName, jsonStorageController.getFileByName);
jsonBaseRouter.put(routes.qFileName, jsonStorageController.updateFileByName);

export default jsonBaseRouter;
