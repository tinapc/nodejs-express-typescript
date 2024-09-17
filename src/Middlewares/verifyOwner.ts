import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './verifyToken';

export const verifyOwner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    const { user } = req.body;
    const { id } = req.params;

    if (user.id === id || user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: 'You are not authorized to perform this action' });
    }
  });
};
