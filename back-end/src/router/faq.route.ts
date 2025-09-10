import {
  authenticateToken,
  authorizeRoles,
} from '@/middlewares/auth.middleware';
import {
  createFaqController,
  delFaqController,
  getFaqController,
  updateFaqController,
} from '../controllers/faq.controller';
import express from 'express';

const route = express.Router();

route.post(
  '/create',
  authenticateToken,
  authorizeRoles('ADMIN', 'OWNER'),
  createFaqController,
);
route.get('/get-faq', getFaqController);
route.patch(
  '/update/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'OWNER'),
  updateFaqController,
);
route.delete('/del/:id', delFaqController);

export default route;
