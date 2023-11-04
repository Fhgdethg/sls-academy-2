import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import authService from '../serviсes/auth.service.js';

import userRepository from '../repositories/user.repository.js';

import mainHelpers from '../helpers/main.helpers.js';

class AuthController {
  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const authErrors = authService.authValidation(email, password);

      if (authErrors.length)
        return res.status(400).json({
          message: 'Data is not valid',
          errors: authErrors,
        });

      const { rows } = await userRepository.findUserByEmail(email);

      const savedUser = rows[0];

      if (!savedUser)
        return res.status(404).json({
          success: false,
          error: 'Not Found',
        });

      const { password: savedPassword, id } = savedUser;

      const isValidPassword = await bcrypt.compare(password, savedPassword);

      if (!isValidPassword)
        return res.status(401).json({
          success: false,
          error: 'Password is not valid',
        });

      const { accessToken, refreshToken } = await authService.updateTokens(id);

      return res.json({
        success: true,
        data: {
          id,
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      const error = err?.message ? err : { message: 'Server error' };
      res.status(500).json(error);
    }
  }

  async signUp(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const authErrors = authService.authValidation(email, password);

      if (authErrors.length)
        return res.status(400).json({
          message: 'Data is not valid',
          errors: authErrors,
        });

      const data = await userRepository.findUserByEmail(email);

      const savedUser = data.rows[0];

      if (savedUser)
        return res.status(409).json({
          success: false,
          error: `User with email ${email} already exist`,
        });

      const hash = await bcrypt.hash(password, 7);
      const userId = mainHelpers.generateUUID();

      await userRepository.addUser(email, hash, userId);

      const { accessToken, refreshToken } =
        await authService.signUpTokensHandler(userId);

      res.status(201).json({
        success: true,
        data: {
          id: userId,
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      const error = err?.message ? err : { message: 'Server error' };
      res.status(500).json(error);
    }
  }
}

export default new AuthController();
