FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma 
COPY . .

# 1. สร้าง Prisma client (มันจะไปอยู่ที่ /app/generated ตามที่คุณตั้งไว้)
RUN npx prisma generate

# 2. Compile TS (จะได้โฟลเดอร์ /app/dist)
RUN npx tsc

EXPOSE 4000
CMD ["node", "dist/server.js"]