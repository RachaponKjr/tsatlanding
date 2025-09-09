import { CmsReq } from '../types/cms.type';
import { Cms } from '../generated/prisma';
import {
  createCmsService,
  getCmsByIdService,
  getCmsService,
  updateCmsService,
} from '../service/cmd.service';
import { Request, Response, NextFunction } from 'express';
import deleteOldFile from '../utils/del-image-file';

const createCmsController = async (req: Request, res: Response) => {
  try {
    const payload = req.body as Partial<CmsReq>;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const imageFieldMapping = {
      banner: 'banner_image',
      logo: 'logo_image',
      item1: 'section3_item1_image',
      item2: 'section3_item2_image',
      item3: 'section3_item3_image',
      promotion_banner: 'promotion_banner',
      promotion_item: 'promotion_item_image',
      iconserviceone: 'icon_service_one',
      iconservicetwo: 'icon_service_two',
      iconservicethree: 'icon_service_three',
      aboutimage: 'about_image',
    } as const;

    Object.entries(imageFieldMapping).forEach(([fileField, payloadField]) => {
      const imageFile = files?.[fileField]?.[0];
      if (imageFile) {
        payload[payloadField] = `/uploads/cms/${imageFile.filename}`;
      }
    });

    const createRes = await createCmsService(payload);

    if (!createRes) {
      return res.status(400).send({ message: 'Can not create CMS!' });
    }

    return res
      .status(200)
      .send({ data: { ...createRes }, message: 'create ok! ' });
  } catch (err) {
    console.error('Create CMS Error:', err);

    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้างข้อมูล',
      error:
        process.env.NODE_ENV === 'development' ? err : 'Internal Server Error',
    });
  }
};

const getCmsController = async (req: Request, res: Response) => {
  try {
    const getRes = await getCmsService();
    if (!getRes) {
      return res.status(400).send({ message: 'Not Fount!' });
    }
    return res.status(200).send({ data: { ...getRes } });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้างข้อมูล',
      error:
        process.env.NODE_ENV === 'development' ? err : 'Internal Server Error',
    });
  }
};

const uploadCmsController = async (req: Request, res: Response) => {
  try {
    const reqPayload = req.body as Partial<CmsReq>;
    const { id } = req.params as unknown as { id: number };
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const imageFieldMapping = {
      banner: 'banner_image',
      bannermobile: 'bannermobile',
      section2_banner: 'section2_banner_url',
      logo: 'logo_image',
      item1: 'section3_item1_image',
      item2: 'section3_item2_image',
      item3: 'section3_item3_image',
      promotion_banner: 'promotion_banner',
      promotion_item: 'promotion_item_image',
      iconserviceone: 'icon_service_one',
      iconservicetwo: 'icon_service_two',
      iconservicethree: 'icon_service_three',
      aboutimage: 'about_image',
    } as const;
    const checkCMS = await getCmsByIdService({ id });
    if (!checkCMS) {
      return res.status(400).send({ message: 'not Found !' });
    }

    for (const [fileField, payloadField] of Object.entries(imageFieldMapping)) {
      const imageFile = files?.[fileField]?.[0];
      if (imageFile) {
        const oldFilePath = checkCMS[
          payloadField as keyof typeof checkCMS
        ] as string;
        if (oldFilePath) {
          await deleteOldFile(oldFilePath);
        }
        (reqPayload as any)[payloadField] =
          `/uploads/cms/${imageFile.filename}`;
      }
    }
    const updateRes = await updateCmsService(id, reqPayload);
    if (!updateRes) {
      return res.status(400).send({ message: 'CannotUpdate' });
    }
    return res
      .status(200)
      .send({ data: { ...updateRes }, message: 'update ok!' });
  } catch (err) {
    console.error('Create CMS Error:', err);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้างข้อมูล',
      error:
        process.env.NODE_ENV === 'development' ? err : 'Internal Server Error',
    });
  }
};

export { createCmsController, getCmsController, uploadCmsController };
