# ---- Step 1: Build Stage ----
    FROM node:18-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy dependencies
    COPY package.json package-lock.json* pnpm-lock.yaml* ./
    RUN npm install
    
    # Copy source code
    COPY . .
    
    # Build Next.js app
    RUN npm run build
    
    # ---- Step 2: Production Stage ----
    FROM node:18-alpine AS runner
    
    # Set working directory
    WORKDIR /app
    
    # Copy only necessary files from builder
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    
    # Set environment variable (optional default)
    ENV NODE_ENV=production
    
    # Expose port
    EXPOSE 3031
    
    # Start app
    CMD ["npm", "start"]
    