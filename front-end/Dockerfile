# ---- Step 1: Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# Copy source code
COPY . .

# Set build-time env for client (Next.js จะ embed)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build Next.js
RUN npm run build

# ---- Step 2: Production Stage ----
FROM node:18-alpine AS runner

WORKDIR /app

# Copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Runtime env
ENV NODE_ENV=production
ENV API_URL=http://tsat-landing-back:3001

EXPOSE 3031
CMD ["npm", "start"]
