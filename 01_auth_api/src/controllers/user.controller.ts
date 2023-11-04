import { Response } from 'express';

import userRepository from '../repositories/user.repository.js';

import { ICustomRequest } from '../types/main.types.js';

export class UserController {
  async getCurrentUser(req: ICustomRequest, res: Response) {
    try {
      const userId = req.userId;

      const { rows } = await userRepository.findUserById(userId);

      const { id, email } = rows[0];

      return res.json({
        success: true,
        data: {
          id,
          email,
        },
      });
    } catch (err) {
      const error = err?.message ? err : { message: 'Server error' };
      res.status(500).json(error);
    }
  }
}

export default new UserController();
