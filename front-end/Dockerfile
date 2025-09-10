# ---- Build stage ----
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    COPY package.json package-lock.json* pnpm-lock.yaml* ./
    RUN npm install
    COPY . .
    
    # <<< NEXT_PUBLIC_* ต้อง embed ตอน build
    ARG NEXT_PUBLIC_API_URL
    ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
    
    RUN npm run build
    
    # ---- Production stage ----
    FROM node:18-alpine AS runner
    WORKDIR /app
    
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    
    ENV NODE_ENV=production
    ENV API_URL=http://tsat-landing-back:3001
    
    EXPOSE 3031
    CMD ["npm", "start"]
    