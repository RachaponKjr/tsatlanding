import {
  createFaqService,
  delFaqService,
  getFaqByIdService,
  getFaqService,
  updateFaqService,
} from '../service/faq.service';
import { Request, Response } from 'express';

export interface FaqReqProps {
  title: string;
  detail: string;
}

const createFaqController = async (req: Request, res: Response) => {
  try {
    const payload = req.body as FaqReqProps;
    const createRes = await createFaqService({ payload });
    if (!createRes) {
      return res
        .status(400)
        .json({ success: false, message: 'ไม่สามารถสร้างได้' });
    }
    return res.status(201).json({ success: true, data: { ...createRes } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error!' });
  }
};

const getFaqController = async (req: Request, res: Response) => {
  try {
    const getRes = await getFaqService();
    if (!getRes) {
      return res.status(400).json({ success: false, message: 'ไม่พบข้อมูล' });
    }
    return res.status(200).json({ success: true, data: [...getRes] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error!' });
  }
};

const updateFaqController = async (req: Request, res: Response) => {
  try {
    const payload = req.body as FaqReqProps;
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'ไม่พบ ID ส่งมา' });
    }
    const updateRes = await updateFaqService({ id: Number(id), payload });
    if (!updateRes) {
      return res
        .status(400)
        .json({ success: false, message: 'ไม่สามารถอัพเดทได้' });
    }
    return res.status(200).json({
      success: true,
      data: { ...updateRes },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error!' });
  }
};

const delFaqController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const checkFaq = await getFaqByIdService({ id: Number(id) });
    if (!checkFaq) {
      return res.status(400).json({ message: 'ไม่พบข้อมูล' });
    }
    const delRes = await delFaqService({ id: Number(id) });
    if (!delRes) {
      return res.status(400).json({ message: 'ไม่สามารถลบข้อมูลได้' });
    }
    return res
      .status(200)
      .json({ success: true, message: 'ลบเรียบร้อย', data: { ...delRes } });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error!' });
  }
};

export {
  createFaqController,
  getFaqController,
  updateFaqController,
  delFaqController,
};
