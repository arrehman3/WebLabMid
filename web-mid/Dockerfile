# Stage 1: Build Frontend (Vite)
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package*.json vite.config.js index.html ./
COPY src ./src
COPY public ./public
RUN npm install && npm run build

# Stage 2: Build Backend (Express)
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json .
RUN npm install --production
COPY backend .

# Stage 3: Production Image (Nginx + Express)
FROM nginx:alpine
WORKDIR /app

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend build
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# Copy backend
COPY --from=backend-build /app/backend /app/backend
WORKDIR /app/backend

# Install production dependencies (if any peer deps are needed)
RUN npm install --production

EXPOSE 80
CMD sh -c "node index.js & nginx -g 'daemon off;'"