import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
import CMSRouter from './router/cms.route';
import PageRouter from './router/page.route';
import SeoRouter from './router/seo.route';
import ContactRouter from './router/contact.route';
import UserRouter from './router/user.route';
import FaqRouter from './router/faq.route';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const apiVersion = '/api/v1';

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // สำหรับ static files
  }),
);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve static files ย้ายมาก่อน routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(`${apiVersion}/cms`, CMSRouter);
app.use(`${apiVersion}/seopage`, PageRouter);
app.use(`${apiVersion}/contact`, ContactRouter);
app.use(`${apiVersion}/seo`, SeoRouter);
app.use(`${apiVersion}/user`, UserRouter);
app.use(`${apiVersion}/faq`, FaqRouter);
app.get('/', (req, res) => {
  return res.status(200).send({ message: 'Server Ok' });
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
