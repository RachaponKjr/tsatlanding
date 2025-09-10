import {
  authenticateToken,
  authorizeRoles,
} from '../middlewares/auth.middleware';
import {
  getContactController,
  updateContactController,
} from '../controllers/contact.controller';
import express from 'express';
const router = express.Router();

router.get('/get-contact', getContactController);
router.patch(
  '/update-contact/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'OWNER'),
  updateContactController,
);

export default router;
