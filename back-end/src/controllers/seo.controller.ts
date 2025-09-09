import {
  createSeoService,
  getSeoService,
  updateSeoService,
} from '../service/seo.service';
import { Seo } from '../types/seo.type';
import { Request, Response } from 'express';

const createSeoController = async (req: Request, res: Response) => {
  try {
    const data = req.body as Seo;
    const image = req.file;

    const payload = {
      ...data,
      ...(image && { defaultOgImage: `/uploads/seosetting/${image.filename}` }),
    };

    const createRes = await createSeoService({ data: payload });
    if (!createRes) {
      return res.status(400).send({ message: 'Can not create Seo Setting!' });
    }

    return res
      .status(201)
      .send({ data: { ...createRes }, message: 'create ok!' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

const getSeoController = async (req: Request, res: Response) => {
  try {
    const getRes = await getSeoService();
    if (!getRes) {
      return res.status(400).send({ message: 'not found!' });
    }
    return res.status(200).send({ data: { ...getRes } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};
const updateSeoController = async (req: Request, res: Response) => {
  try {
    const update = req.body as Partial<Seo>;
    const { id } = req.params as { id: string };
    const image = req.file;

    const payload = {
      ...update,
      ...(image && { defaultOgImage: `/uploads/seosetting/${image.filename}` }),
    };

    const updateRes = await updateSeoService({ id, data: payload });
    if (!updateRes) {
      return res.status(400).send({ message: 'can not update!' });
    }
    return res
      .status(200)
      .send({ data: { ...updateRes }, message: 'updated !' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

export { createSeoController, getSeoController, updateSeoController };
