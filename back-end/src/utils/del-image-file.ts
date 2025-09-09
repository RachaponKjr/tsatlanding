import fs from 'fs';
import path from 'path';

const deleteOldFile = async (filePath: string) => {
  if (!filePath) return;

  // ลบ "/" ตัวหน้าถ้ามี
  const normalizedPath = filePath.startsWith('/')
    ? filePath.slice(1)
    : filePath;

  // ชี้ไปที่ src/ จริง ๆ
  const fullPath = path.join(process.cwd(), 'src', normalizedPath);

  if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isFile()) {
    fs.unlinkSync(fullPath);
    console.log(`Deleted old file: ${fullPath}`);
  } else {
    console.warn(`File not found or not a file: ${fullPath}`);
  }
};

export default deleteOldFile;
