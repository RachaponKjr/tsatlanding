# ---- Build stage ----
FROM node:20-alpine AS builder

# ติดตั้ง Library ที่จำเป็นสำหรับการ Build
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Install Dependencies
RUN npm install

# Copy source code
COPY . .

# --- จุดสำคัญ ---
ARG NEXT_PUBLIC_API_URL=/api/landing
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# ---------------------

# Config เพื่อลดการกิน RAM ตอน Build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS="--max-old-space-size=1024"

# สั่ง Build
RUN npm run build

# ---- Production stage (Secure Hardened) ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# URL สำหรับ Server-side
ENV API_URL=http://tsat-landing-back:3001/api/v1

# ---------------------------------------------------
# 🛡️ SECURITY HARDENING: ตัดเครื่องมือโจรทิ้ง 🛡️
# 1. ลบ apk (Package Manager) เพื่อป้องกันการแอบลงโปรแกรมเพิ่ม
# 2. ลบ wget และ curl เพื่อป้องกันการดาวน์โหลด Script ไวรัส
# 3. ลบ nc (Netcat) ถ้ามี เพื่อป้องกันการทำ Reverse Shell
# ---------------------------------------------------
RUN apk update && \
    rm -rf /sbin/apk /etc/apk /lib/apk /usr/share/apk /var/lib/apk && \
    rm -rf /usr/bin/wget /usr/bin/curl /usr/bin/nc

# สร้าง User เพื่อความปลอดภัย (Non-root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy ไฟล์ Public
COPY --from=builder /app/public ./public

# Copy ไฟล์ Build (Standalone mode)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# สลับมาใช้ User ธรรมดา (สำคัญมาก! ห้ามลบ)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]