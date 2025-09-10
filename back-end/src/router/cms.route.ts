import {
  authenticateToken,
  authorizeRoles,
} from '../middlewares/auth.middleware';
import {
  createCmsController,
  getCmsController,
  uploadCmsController,
} from '../controllers/cms.controller';
import { createMulterUpload } from '../utils/multer';
import express from 'express';
const router = express.Router();

const upload = createMulterUpload('cms');

router.post(
  '/create-cms',
  authenticateToken,
  authorizeRoles('ADMIN', 'OWNER'),
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'bannermobile', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'item1', maxCount: 1 },
    { name: 'item2', maxCount: 1 },
    { name: 'item3', maxCount: 1 },
    { name: 'promotion_banner', maxCount: 1 },
    { name: 'promotion_item', maxCount: 1 },
    { name: 'iconserviceone', maxCount: 1 },
    { name: 'iconservicetwo', maxCount: 1 },
    { name: 'iconservicethree', maxCount: 1 },
    { name: 'aboutimage', maxCount: 1 },
  ]),
  createCmsController,
);
router.patch(
  '/update-cms/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'OWNER'),
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'bannermobile', maxCount: 1 },
    { name: 'section2_banner', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'item1', maxCount: 1 },
    { name: 'item2', maxCount: 1 },
    { name: 'item3', maxCount: 1 },
    { name: 'promotion_banner', maxCount: 1 },
    { name: 'promotion_item', maxCount: 1 },
    { name: 'iconserviceone', maxCount: 1 },
    { name: 'iconservicetwo', maxCount: 1 },
    { name: 'iconservicethree', maxCount: 1 },
    { name: 'aboutimage', maxCount: 1 },
  ]),
  uploadCmsController,
);
router.get('/get-cms', getCmsController);

export default router;
