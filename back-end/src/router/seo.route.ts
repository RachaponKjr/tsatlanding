import { createMulterUpload } from '../utils/multer';
import {
  createSeoController,
  getSeoController,
  updateSeoController,
} from '../controllers/seo.controller';
import express from 'express';
import {
  authenticateToken,
  authorizeRoles,
} from '../middlewares/auth.middleware';
const route = express.Router();

const upload = createMulterUpload('seosetting');

route.post(
  '/createseo',
  authenticateToken,
  authorizeRoles('OWNER', 'ADMIN'),
  upload.single('ogimage'),
  createSeoController,
);
route.get('/getseo', getSeoController);
route.patch(
  '/updateseo/:id',
  authenticateToken,
  authorizeRoles('OWNER', 'ADMIN'),
  upload.single('ogimage'),
  updateSeoController,
);

export default route;
