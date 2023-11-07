import { Router } from 'express';

import placeController from '../controllers/place.controller.js';

import { routes } from '../constants/routes.js';

const placeRouter = Router();

placeRouter.get(routes.currentPlace, placeController.getCurrentPlace);

export default placeRouter;
