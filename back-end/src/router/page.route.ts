import {
  authenticateToken,
  authorizeRoles,
} from '../middlewares/auth.middleware';
import {
  createseoPageController,
  getseoPageController,
  updateseoPageController,
} from '../controllers/page.controller';
import { createMulterUpload } from '../utils/multer';
import express from 'express';
const route = express.Router();

const upload = createMulterUpload('seo-page');

route.post(
  '/create',
  authenticateToken,
  authorizeRoles('OWNER', 'ADMIN'),
  upload.fields([
    { name: 'ogImage', maxCount: 1 },
    { name: 'twitterImage', maxCount: 1 },
  ]),
  createseoPageController,
);
route.get('/get-seo-page', getseoPageController);
route.patch(
  '/update-seo-page/:id',
  authenticateToken,
  authorizeRoles('OWNER', 'ADMIN'),
  upload.fields([
    { name: 'ogImage', maxCount: 1 },
    { name: 'twitterImage', maxCount: 1 },
  ]),
  updateseoPageController,
);

export default route;
