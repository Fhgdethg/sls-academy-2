import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import { ICustomRequest } from '../types/main.types.js';
import { IDecodedAccessToken } from '../types/tokens.types.js';

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
    const payload = jwt.verify(token, JWT_SECRET) as IDecodedAccessToken;

    if (payload.type !== 'access')
      return res.status(401).json({ message: 'Invalid token' });

    req.userId = payload.userId;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return res.status(401).json({ message: 'Token expired' });
    if (err instanceof jwt.JsonWebTokenError)
      return res.status(401).json({ message: 'Invalid token' });
    return res.status(401).json({ message: 'Auth error' });
  }

  next();
};

export default authMiddleware;
