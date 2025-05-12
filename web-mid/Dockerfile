# Dockerfile for project with separate frontend and backend

# Frontend Build Stage
FROM node:18-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /app

# Copy frontend package files
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source files
COPY . ./
# Excluding backend folder and node_modules
COPY .gitignore .env* *.js *.json *.html ./
COPY public ./public
COPY src ./src

# Build the frontend
RUN npm run build

# Backend Build Stage
FROM node:18-alpine

# Set working directory for backend
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install backend production dependencies
RUN npm install --production

# Copy backend files
COPY backend/ ./

# Copy frontend build from previous stage
COPY --from=frontend-build /app/dist ./public

# Expose the port your app runs on
EXPOSE 5000

# Command to run the backend
CMD ["node", "index.js"]

