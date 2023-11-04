import { Router } from 'express';

import userController from '../controllers/user.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

import { routes } from '../constants/routes.js';

const userRouter = Router();

userRouter.get(routes.me, authMiddleware, userController.getCurrentUser);

export default userRouter;
