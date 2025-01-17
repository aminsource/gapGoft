# Stage 1: Development
FROM node:lts AS development

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy all source files
COPY . .

# Stage 2: Build
FROM development AS build

# Build the production-ready files
RUN yarn run build

# Stage 3: Nginx setup for serving the build
FROM nginx:alpine

# Copy custom Nginx configuration
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to default nginx serving directory
WORKDIR /usr/share/nginx/html

# Remove default nginx assets
RUN rm -rf ./*

# Copy built assets from the build stage
COPY --from=build /app/dist .

# Expose port 80 for HTTP traffic
EXPOSE 80

# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
