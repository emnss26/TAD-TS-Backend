import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/index';

/**
 * app.ts
 *
 * Entry point for the Express server:
 *  - Configures global middleware (JSON parsing, cookies, CORS, security headers)
 *  - Defines health-check endpoint GET /
 *  - Mounts application routers
 *  - Global error handler to standardize error responses
 *  - Starts listening on configured PORT
 */

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    res.send('API Alive');
  }
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    data: null,
    error: err.message,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;