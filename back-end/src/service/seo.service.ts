import { Seo } from '../types/seo.type';
import prisma from '../utils/prisma';

const createSeoService = async ({ data }: { data: Seo }) => {
  const res = await prisma.seoSettings.create({
    data: data,
  });
  return res;
};

const getSeoService = async () => {
  const res = await prisma.seoSettings.findFirst();
  return res;
};

const updateSeoService = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Seo>;
}) => {
  const res = await prisma.seoSettings.update({
    where: {
      id,
    },
    data,
  });
  return res;
};

export { createSeoService, getSeoService, updateSeoService };
