# ---- Build stage ----
FROM node:20-alpine AS builder

# ติดตั้ง Library ที่จำเป็น
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Install Dependencies
RUN npm install

# Copy source code
COPY . .

# --- จุดสำคัญที่แก้ให้ ---
# รับค่า ARG แต่ตั้งค่า Default ไว้เป็น /api/landing เลย
# แปลว่า: ถ้าลืมส่งค่ามาจาก docker-compose ก็ยังทำงานได้ถูกต้อง!
ARG NEXT_PUBLIC_API_URL=/api/landing
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# ---------------------

# Config เพื่อลดการกิน RAM ตอน Build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS="--max-old-space-size=1024"

# สั่ง Build (ค่า Environment จะถูกฝังลงไปใน Code จังหวะนี้)
RUN npm run build

# ---- Production stage (Secure) ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# URL สำหรับ Server-side (ยิงหา Backend ภายใน Docker Network)
# ตรวจสอบว่า Container Backend ชื่อ "tsat-landing-back" และรัน port 3001 จริง
ENV API_URL=http://tsat-landing-back:3001/api/v1

# สร้าง User เพื่อความปลอดภัย (Non-root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy ไฟล์ Public
COPY --from=builder /app/public ./public

# Copy ไฟล์ Build (Standalone mode)
# สำคัญ: ต้องกำหนด --chown ให้เป็นของ nextjs ทันทีที่ Copy
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# สลับมาใช้ User ธรรมดา
USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]