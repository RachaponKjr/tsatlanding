import { UserReq, UserReqSchama } from '../types/user.type';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  createUserService,
  delUserService,
  getUserById,
  getUserService,
  updateUserService,
} from '../service/user.service';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const createUserController = async (req: Request, res: Response) => {
  try {
    const payload = UserReqSchama.safeParse(req.body);
    const salt = 10;
    if (!payload.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: payload.error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    const hashedPassword = await bcrypt.hash(payload.data.password, salt);
    payload.data.password = hashedPassword;
    const createRes = await createUserService({ payload: payload.data });
    if (!createRes) {
      return res
        .status(400)
        .json({ success: false, message: 'ไม่สามารถสร้าง USER ได้' });
    }
    return res.status(201).json({ success: true, data: { ...createRes } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

const loginUserController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // 1. ตรวจสอบ input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username และ Password ต้องไม่ว่าง',
      });
    }

    // 2. หา user จาก DB
    const users = await getUserService();
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ success: false, message: 'ไม่พบผู้ใช้' });
    }

    // 3. ตรวจสอบ password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: 'รหัสผ่านไม่ถูกต้อง' });
    }

    // 4. สร้าง JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' },
    );
    console.log(JWT_SECRET);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // 5. ส่งกลับ
    return res.status(200).json({
      success: true,
      message: 'Login สำเร็จ',
      data: {
        user: { id: user.id, username: user.username, role: user.role },
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

const getUserController = async (req: Request, res: Response) => {
  try {
    const getUsers = await getUserService();
    return res.status(200).json({ success: true, data: [...getUsers] });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'ไม่พบ ID ที่ส่งมา' });
    }
    const getRes = await getUserById({ id: Number(id) });

    if (!getRes) {
      return res.status(400).json({ success: false, message: 'ไม่พบ User' });
    }
    return res.status(200).json({ success: true, data: { ...getRes } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const salt = 10;
    const payload = req.body as Partial<UserReq>;
    const checkUser = await getUserById({ id: Number(id) });

    if (payload.role === 'OWNER' && checkUser?.role !== 'OWNER') {
      return res
        .status(400)
        .json({ success: false, message: 'ไม่สามารถ อัพเดท สิทธินี้ได้' });
    }

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'ไม่พบ ID ที่ส่งมา' });
    }
    if (payload.password) {
      const hashedPassword = await bcrypt.hash(payload.password, salt);
      payload.password = hashedPassword;
    }

    const updateRes = await updateUserService({ id: Number(id), payload });
    return res.status(200).json({ success: true, data: { ...updateRes } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

const delUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users = await getUserService();
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      return res.status(401).json({ success: false, message: 'ไม่พบผู้ใช้' });
    }

    const resdel = await delUserService({ id: Number(id) });
    return res.status(200).json({ success: true, data: { ...resdel } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

export {
  createUserController,
  getUserController,
  getUserByIdController,
  loginUserController,
  updateUserController,
  delUserController,
};
