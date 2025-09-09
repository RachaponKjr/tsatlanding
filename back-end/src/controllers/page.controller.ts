import deleteOldFile from '../utils/del-image-file';
import {
  createSeoPageService,
  getSeoPageByIdService,
  getSeoPageService,
  updateSeoPageService,
} from '../service/page.service';
import { PageCreate, PageCreateSchema } from '../types/page.type';
import { Request, Response } from 'express';

const createseoPageController = async (req: Request, res: Response) => {
  try {
    const parseResult = PageCreateSchema.safeParse(req.body);
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const ogImageFile = files?.ogImage?.[0] || null;
    const twitterImageFile = files?.twitterImage?.[0] || null;
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }
    const data = parseResult.data;
    if (data.keywords && data.keywords.length > 0) {
      data.keywords = data.keywords[0]
        .split(',')
        .map((s) => s.replace(/'/g, '').trim());
    }
    if (ogImageFile) {
      data.ogImage = `/uploads/seo-page/${ogImageFile.filename}`;
    }
    if (twitterImageFile) {
      data.twitterImage = `/uploads/seo-page/${twitterImageFile.filename}`;
    }
    const createSeoPageRes = await createSeoPageService(data);

    if (!createSeoPageRes) {
      return res.status(400).send({ message: 'Can Not Create SeoPage !' });
    }
    return res
      .status(201)
      .send({ data: { ...createSeoPageRes }, message: 'Create OK!' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

const getseoPageController = async (req: Request, res: Response) => {
  try {
    const getRes = await getSeoPageService();
    if (!getRes) {
      return res.status(400).send({ message: 'Not Fount!' });
    }
    return res.status(200).send({ data: { ...getRes } });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

const updateseoPageController = async (req: Request, res: Response) => {
  try {
    const reqData = req.body as Partial<PageCreate>;
    const { id } = req.params;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const ogImageFile = files?.ogImage?.[0] || null;
    const twitterImageFile = files?.twitterImage?.[0] || null;

    const checkSeo = await getSeoPageByIdService({ id });

    const raw = req.body.keywords;
    if (typeof raw === 'string') {
      reqData.keywords = raw
        .replace(/[\[\]]/g, '')
        .split(',')
        .map((k) => k.trim());
    }
    if (ogImageFile && checkSeo) {
      deleteOldFile(checkSeo.ogImage as string);
      reqData.ogImage = `/uploads/seo-page/${ogImageFile.filename}`;
    }
    if (twitterImageFile && checkSeo) {
      deleteOldFile(checkSeo.twitterImage as string);
      reqData.twitterImage = `/uploads/seo-page/${twitterImageFile.filename}`;
    }

    const updateRes = await updateSeoPageService({ data: reqData, id });

    if (!updateRes) {
      return res.status(400).send({ message: 'Can not update!' });
    }

    return res.status(200).send({ data: { ...updateRes }, message: 'OK!' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Server Error!' });
  }
};

export {
  createseoPageController,
  getseoPageController,
  updateseoPageController,
};
