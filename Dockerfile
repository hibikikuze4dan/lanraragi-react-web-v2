# Use an official Node.js image as the builder stage
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for efficient caching
COPY package.json yarn.lock ./

# Set NODE_ENV to production so yarn only install regular dependencies
ENV NODE_ENV production

# Install dependencies
RUN yarn install

# Copy the rest of the app source code
COPY . .

# Build the Vite app
RUN yarn build

# Use a lightweight web server for serving the built application
FROM nginx:alpine

# Set working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy built files from the builder stage
COPY --from=builder /app/dist .

# Expose port 22498
EXPOSE 22498

# Replace the default Nginx configuration to serve from port 22498
RUN sed -i 's/listen       80;/listen 22498;/' /etc/nginx/conf.d/default.conf

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
