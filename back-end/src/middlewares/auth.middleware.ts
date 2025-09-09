import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'G16JugJ3RpYzVQQeAU4ptYcBRXVzKLGd6YHePIS6XTqIrRDoF47j+r8m9wO/pVwP';
// type ของ payload ที่เก็บใน JWT
interface JwtPayload {
  id: number;
  username: string;
  role: 'USER' | 'ADMIN' | 'OWNER';
}

// Middleware ตรวจสอบ token ว่าถูกต้องหรือไม่
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: 'No token provided',
        redirect: '/admin-login',
      });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = decoded; // เก็บข้อมูล user ลง req
    next();
  } catch (err) {
    return res
      .status(403)
      .json({
        success: false,
        message: 'Invalid or expired token',
        redirect: '/admin-login',
      });
  }
};

// Middleware เช็ค role
export const authorizeRoles = (
  ...allowedRoles: ('USER' | 'ADMIN' | 'OWNER')[]
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as JwtPayload;

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ success: false, message: 'Forbidden: insufficient role' });
    }

    next();
  };
};
