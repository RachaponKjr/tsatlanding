# ---- Build stage ----
# 1. แก้เป็น Node 20 (ตามที่ Next.js บังคับ)
FROM node:20-alpine AS builder

# ติดตั้ง Library ที่จำเป็น (กัน Error บางอย่างของ Alpine)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Install แบบสะอาด (ถ้าไม่มี lock file มันจะสร้างให้)
RUN npm install

# Copy source code
COPY . .

# รับค่า Environment ตอน Build (ถูกต้องแล้วครับ)
ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=https://topserviceautotechnic.com/api/landing

# ปิด Telemetry และจำกัด Ram ตอน Build กันเครื่องค้าง
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS="--max-old-space-size=1024"

RUN npm run build

# ---- Production stage (Secure) ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# 2. Server-side API URL (เรียกหา Backend ภายใน Docker network)
ENV API_URL=https://topserviceautotechnic.com/api/landing

# 3. สร้าง User ความปลอดภัยสูง (กัน Hacker)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy ไฟล์จำเป็น
COPY --from=builder /app/public ./public

# 4. ใช้โหมด Standalone (ไฟล์เล็กและเร็ว)
# ต้องเปลี่ยนเจ้าของไฟล์เป็น nextjs ด้วย
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 5. สลับไปใช้ User ธรรมดา (สำคัญที่สุด!)
USER nextjs

EXPOSE 3000
ENV PORT=3000

# ใช้ node server.js แทน npm start (สำหรับ standalone)
CMD ["node", "server.js"]