import { Router } from 'express';

import authController from '../controllers/auth.controller.js';

import { routes } from '../constants/routes.js';

const authRouter = Router();

authRouter.post(routes.signIn, authController.signIn);

authRouter.post(routes.signUp, authController.signUp);

export default authRouter;
