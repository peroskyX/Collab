import { NextFunction, Request } from 'express';
import UserModel from '../models/user.model';
import mongoose from 'mongoose';

export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const existingUser = UserModel.findById({});
};
