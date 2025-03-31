FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production=false

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
