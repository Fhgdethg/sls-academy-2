import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import { ICustomRequest } from '../types/main.types.js';

const JWT_SECRET = `${process.env.JWT_SECRET}`;

const authMiddleware = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === 'OPTIONS') return next();

  const authHandler = req.get('Authorization');

  if (!authHandler)
    return res.status(401).json({ message: 'Token not provided' });

  const token = authHandler.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (payload.type !== 'access')
      return res.status(401).json({ message: 'Invalid token' });

    req.userId = payload.userId;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};

export default authMiddleware;
