FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma 
COPY . .

# Generate Prisma client during build
RUN npx prisma generate

EXPOSE 4000
CMD ["npm", "start"]
