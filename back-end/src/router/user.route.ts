import {
  authenticateToken,
  authorizeRoles,
} from '../middlewares/auth.middleware';
import {
  createUserController,
  delUserController,
  getUserByIdController,
  getUserController,
  loginUserController,
  updateUserController,
} from '../controllers/user.controller';
import express, { Request, Response } from 'express';

const route = express.Router();

route.post(
  '/create-user',
  // authenticateToken,
  // authorizeRoles('ADMIN', 'OWNER'),
  createUserController,
);
route.post('/check-token', authenticateToken, (req: Request, res: Response) => {
  try {
    // ถ้า authenticateToken ผ่าน จะมี user ใน req
    const user = (req as any).user;
    return res.status(200).json({
      success: true,
      message: 'Token is valid',
      user, // ส่งข้อมูล user กลับไป
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Server error while checking token',
      redirect: '/login',
    });
  }
});
route.post('/login', loginUserController);
route.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token', { path: '/' });
  res.status(200).json({ success: true, message: 'Logged out' });
});
route.get('/get-users', authenticateToken, getUserController);
route.get('/get-user/:id', authenticateToken, getUserByIdController);
route.patch(
  '/update-user/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'OWNER'),
  updateUserController,
);
route.delete(
  '/del-user/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'OWNER'),
  delUserController,
);

export default route;
