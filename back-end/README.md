# NodeJS Setup with TypeScript

โปรเจกต์ตัวอย่างสำหรับเริ่มต้น Node.js ด้วย TypeScript พร้อมเครื่องมือพัฒนาต่าง ๆ เช่น ESLint, Prettier, Nodemon และการตั้งค่าใช้งานแบบครบวงจร

---

## 📋 รายละเอียดโปรเจกต์

- ใช้ **Node.js** ร่วมกับ **TypeScript**  
- ใช้ **Express.js** เป็น Web Framework  
- มีการตั้งค่า **ESLint** และ **Prettier** เพื่อรักษาคุณภาพและมาตรฐานโค้ด  
- ใช้ **Nodemon + ts-node** สำหรับการพัฒนาแบบ hot-reload  
- ใช้ **dotenv** สำหรับจัดการ environment variables  
- มีการใช้ไลบรารีเสริม เช่น `cors` ป้องกันปัญหา CORS, `helmet` เพิ่มความปลอดภัย, `morgan` สำหรับ logging, `multer` สำหรับจัดการ multipart/form-data (upload ไฟล์), และ `zod` สำหรับ schema validation

---

## 🛠 ติดตั้งและตั้งค่า

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
