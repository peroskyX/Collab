import { Router } from 'express';
import { getCurrentUserController } from '../controllers/user.controller';
import isAuthenticated from '../middlewares/isAuthenticated.middleware';

const userRoutes = Router();

userRoutes.get('/current', isAuthenticated, getCurrentUserController);

export default userRoutes;
