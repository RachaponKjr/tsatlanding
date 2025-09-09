import { Contact } from '../types/contact.type';
import { PrismaClient } from '../generated/prisma';

const db = new PrismaClient();

const getContactService = async () => {
  const res = await db.contact.findFirst();
  return res;
};

const updateContactService = async ({
  payload,
  id,
}: {
  payload: Contact;
  id: number;
}) => {
  const updateRes = await db.contact.update({
    where: {
      id: Number(id),
    },
    data: payload,
  });
  return updateRes;
};

export { getContactService, updateContactService };
