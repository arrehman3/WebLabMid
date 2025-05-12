# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Remove this line ↓ (nginx.conf is mounted in compose)
# COPY nginx.conf /etc/nginx/conf.d/default.conf