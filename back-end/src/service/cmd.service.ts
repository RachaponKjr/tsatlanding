import { CmsReq } from '../types/cms.type';
import { PrismaClient } from '../generated/prisma';

const db = new PrismaClient();

const createCmsService = async (payload: Partial<CmsReq>) => {
  try {
    const res = await db.cms.create({
      data: payload,
    });
    return res;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('ไม่สามารถบันทึกข้อมูลได้');
  } finally {
    await db.$disconnect();
  }
};

// เพิ่มฟังก์ชันอื่นๆ สำหรับ CMS
const getCmsService = async () => {
  try {
    const cms = await db.cms.findFirst();
    return cms;
  } catch (error) {
    throw new Error('ไม่สามารถดึงข้อมูลได้');
  } finally {
    await db.$disconnect();
  }
};

const getCmsByIdService = async ({ id }: { id: number }) => {
  const res = await db.cms.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res;
};

const updateCmsService = async (id: number, payload: Partial<CmsReq>) => {
  try {
    const result = await db.cms.update({
      where: { id: Number(id) },
      data: payload,
    });
    return result;
  } catch (error) {
    console.error('Update CMS Error:', error);
    throw new Error('ไม่สามารถอัปเดตข้อมูลได้');
  } finally {
    await db.$disconnect();
  }
};

const deleteCmsService = async (id: number) => {
  try {
    const result = await db.cms.delete({
      where: { id },
    });
    return result;
  } catch (error) {
    console.error('Delete CMS Error:', error);
    throw new Error('ไม่สามารถลบข้อมูลได้');
  } finally {
    await db.$disconnect();
  }
};

export {
  createCmsService,
  getCmsService,
  updateCmsService,
  deleteCmsService,
  getCmsByIdService,
};
