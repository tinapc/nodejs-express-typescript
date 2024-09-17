import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (error, user) => {
    if (error) {
      return res.status(401).json({ error: 'Token is invalid!' });
    }

    req.body.user = user;
    return next();
  });
};
