FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma 
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TS (ถ้าใช้ TS)
RUN npx tsc

EXPOSE 4000
CMD ["node", "dist/server.js"]
