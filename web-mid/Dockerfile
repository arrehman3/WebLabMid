# Stage 1: Build Frontend (Vite) - Unchanged
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package*.json vite.config.js index.html ./
COPY src ./src
COPY public ./public
RUN npm install && npm run build

# Stage 2: Build Backend (Express) - Unchanged
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json .
RUN npm install --production
COPY backend .

# Stage 3: Production Image (Now with Node.js + Nginx)
FROM node:18-alpine AS production
WORKDIR /app

# Install Nginx alongside Node.js
RUN apk add --no-cache nginx && \
    mkdir -p /run/nginx

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend build
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# Copy backend
COPY --from=backend-build /app/backend ./backend

EXPOSE 80
CMD sh -c "cd backend && node index.js & nginx -g 'daemon off;'"