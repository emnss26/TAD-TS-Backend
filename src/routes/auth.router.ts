import { Router } from 'express';
import { getThreeLeggedAuth, getTwoLeggedAuth, postLogoutAuth  } from '../controllers/auth.controller';
import { getUserStatusAuth } from '../controllers/auth.user.status.controller';

/**
 * routes/auth.router.ts
 *
 * Defines the /auth routes:
 *  - GET  /auth/three-legged → OAuth 3-legged flow callback
 *  - GET  /auth/two-legged   → Returns client-credentials token
 *  - POST /auth/logout       → Clears auth cookie
 *  - POST /auth/user-status  → Checks current user’s OAuth status
 */

const router = Router();

router.get('/three-legged', getThreeLeggedAuth);
router.get('/two-legged', getTwoLeggedAuth);
router.post('/logout', postLogoutAuth);
router.get('/user-status', getUserStatusAuth);

export default router;