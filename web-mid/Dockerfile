# Frontend Build Stage
FROM node:18-alpine AS frontend-build

# Set working directory for frontend (root)
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy all frontend files (excluding backend folder)
COPY . .

# Build the frontend (adjust build command if different)
RUN npm run build

# Backend Runtime Stage
FROM node:18-alpine

# Set working directory for backend
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install backend production dependencies
RUN npm install --production

# Copy backend source files
COPY backend/ ./

# Copy frontend build from previous stage
COPY --from=frontend-build /app/dist ./public

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/ || exit 1

# Command to run the backend
CMD ["node", "index.js"]