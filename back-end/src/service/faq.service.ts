import prisma from '../utils/prisma';
import { FaqReqProps } from './../controllers/faq.controller';

const createFaqService = async ({ payload }: { payload: FaqReqProps }) => {
  const res = await prisma.fAQ.create({
    data: payload,
  });
  return res;
};

const getFaqService = async () => {
  const res = await prisma.fAQ.findMany();
  return res;
};

const getFaqByIdService = async ({ id }: { id: Number }) => {
  const res = await prisma.fAQ.findUnique({
    where: { id: Number(id) },
  });
  return res;
};

const updateFaqService = async ({
  id,
  payload,
}: {
  id: number;
  payload: FaqReqProps;
}) => {
  const res = await prisma.fAQ.update({
    where: {
      id,
    },
    data: payload,
  });
  return res;
};

const delFaqService = async ({ id }: { id: Number }) => {
  const res = await prisma.fAQ.delete({
    where: {
      id: Number(id),
    },
  });
  return res;
};

export {
  createFaqService,
  getFaqService,
  updateFaqService,
  getFaqByIdService,
  delFaqService,
};
