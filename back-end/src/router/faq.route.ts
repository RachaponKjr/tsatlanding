import {
  createFaqController,
  delFaqController,
  getFaqController,
  updateFaqController,
} from '../controllers/faq.controller';
import express from 'express';

const route = express.Router();

route.post('/create', createFaqController);
route.get('/get-faq', getFaqController);
route.patch('/update/:id', updateFaqController);
route.delete('/del/:id', delFaqController);

export default route;
