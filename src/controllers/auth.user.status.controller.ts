import { RequestHandler } from 'express';
import { getUserStatus } from '../libs/auth/auth.user.status';
import env from '../config/index';

/**
 * controllers/auth.user.status.controller.ts
 *
 * Express handler for checking current user status:
 *  - getUserStatusAuth: reads the access_token cookie,
 *    calls fetchUserStatus to validate it,
 *    and responds with authenticated: true/false.
 */

export const getUserStatusAuth: RequestHandler = async (req, res, next) => {
  // Lee token directamente de la cookie
  const token = req.cookies['access_token'];
  
  if (!token) {
    res.status(401).json({
      data: { authenticated: false },
      error: null,
      message: 'Unauthorized'
    });
    return;
  }

  // Llama a la librería de negocio para validar el token
  const status = await getUserStatus(token);

  if (status.authenticated) {
    res.status(200).json({
      data: { authenticated: true },
      error: null,
      message: null
    });
  } else {
    res.status(401).json({
      data: { authenticated: false },
      error: null,
      message: 'Invalid or expired token'
    });
  }
};