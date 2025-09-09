import { PageCreate } from '../types/page.type';
import prisma from '../utils/prisma';

const createSeoPageService = async (data: PageCreate) => {
  const res = await prisma.page.create({
    data: data,
  });

  return res;
};

const getSeoPageService = async () => {
  const res = await prisma.page.findFirst();
  return res;
};

const getSeoPageByIdService = async ({ id }: { id: string }) => {
  const res = await prisma.page.findUnique({
    where: {
      id,
    },
  });
  return res;
};

const updateSeoPageService = async ({
  data,
  id,
}: {
  data: Partial<PageCreate>;
  id: string;
}) => {
  const res = await prisma.page.update({
    where: {
      id,
    },
    data,
  });
  return res;
};

export {
  createSeoPageService,
  getSeoPageService,
  getSeoPageByIdService,
  updateSeoPageService,
};
