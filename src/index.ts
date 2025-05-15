import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import session from 'cookie-session';
import { config } from './config/app.config';

import './config/passport.config';
import passport from 'passport';
import connectDatabase from './config/database.config';
import { asyncHandler } from './middlewares/asyncHandler.middleware';
import { BadRequestException } from './utils/appError';
import { ErrorCodeEnum } from './enums/error-code.enum';
import { HTTPSTATUS } from './config/http.config';
import { errorHandler } from './middlewares/errorHandler.middleware';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.route';
import isAuthenticated from './middlewares/isAuthenticated.middleware';
import workspaceRoutes from './routes/workspace.route';
import memberRoutes from './routes/member.route';

const app = express();
const BASE_PATH = config.BASE_PATH;
console.log(typeof BASE_PATH);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: 'session',
    keys: [config.SESSION_SECRET!],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
  `${BASE_PATH}`,
  asyncHandler(
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      return res.status(HTTPSTATUS.OK).json({
        message: 'Hello Subscribe to the channel & share',
      });
    })
  )
);

app.use(`${BASE_PATH}/v1/auth`, authRoutes);
app.use(`${BASE_PATH}/v1/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/v1/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `Server listening on port ${config.PORT} in ${config.NODE_ENV} with path ${BASE_PATH}`
  );
  await connectDatabase();
});
