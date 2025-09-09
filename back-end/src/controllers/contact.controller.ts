import { ContactSchama } from '../types/contact.type';
import {
  getContactService,
  updateContactService,
} from '../service/contact.service';
import { Request, Response } from 'express';

const getContactController = async (req: Request, res: Response) => {
  try {
    const contactRes = await getContactService();
    if (!contactRes) {
      return res
        .status(400)
        .json({ success: false, message: 'ไม่พบข้อมูลในฐานข้อมูล' });
    }
    return res.status(200).json({ data: { ...contactRes }, success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Server Error!' });
  }
};

const updateContactController = async (
  req: Request,
  res: Response,
): Promise<Response | unknown> => {
  try {
    const { id } = req.params as unknown as { id: number };
    const payload = req.body;
    // console.log(payload);
    // if (!payload.success) {
    //   const zodError = payload.error;
    //   const errors = zodError.issues.map((err) => ({
    //     path: err.path.join('.'),
    //     message: err.message,
    //   }));
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Validation Failed',
    //     errors,
    //   });
    // }

    const updateRes = await updateContactService({
      payload: payload,
      id,
    });

    return res.status(200).json({ success: true, data: { ...updateRes } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Server Error!' });
  }
};

export { getContactController, updateContactController };
