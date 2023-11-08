import { Router } from 'express';

import linkController from '../controllers/link.controller.js';

import { routes } from '../constants/routes.js';

const linkRouter = Router();

linkRouter.post(routes.shorten, linkController.createAlias);
linkRouter.get(routes.url, linkController.getDataByLink);

export default linkRouter;
