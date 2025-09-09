import { PrismaClient } from '../generated/prisma';
import { UserReq } from '../types/user.type';

const db = new PrismaClient();
const createUserService = async ({ payload }: { payload: UserReq }) => {
  const res = await db.user.create({
    data: payload,
  });
  return res;
};

const getUserService = async () => {
  const res = await db.user.findMany();
  return res;
};

const getUserById = async ({ id }: { id: number }) => {
  const res = await db.user.findUnique({
    where: {
      id,
    },
  });
  return res;
};

const updateUserService = async ({
  id,
  payload,
}: {
  id: number;
  payload: Partial<UserReq>;
}) => {
  if (payload.password === null || payload.password === undefined) {
    delete payload.password;
  }

  const res = await db.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return res;
};

const delUserService = async ({ id }: { id: number }) => {
  const res = await db.user.delete({
    where: {
      id,
    },
  });
  return res;
};

export {
  createUserService,
  getUserService,
  getUserById,
  updateUserService,
  delUserService,
};
