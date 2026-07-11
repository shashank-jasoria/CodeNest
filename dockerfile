FROM node:20-slim

# Install compilers & runtimes
RUN apt-get update && apt-get install -y \
    g++ \
    gcc \
    python3 \
    default-jdk \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/bin/python3 /usr/bin/python

# Set workdir to the backend folder
WORKDIR /app/backend

# Copy the backend’s compiled code and its package files
COPY backend/dist ./dist
COPY backend/package*.json ./

# Install backend production dependencies
RUN npm ci --omit=dev

# Now copy the frontend build output to /app/dist
# (so that path.join(__dirname, "../../dist") -> /app/dist)
COPY dist /app/dist

# The server will listen on the PORT env variable (default 3300)
ENV PORT=3300
EXPOSE 3300

# Start the server from the backend folder
CMD ["node", "dist/index.js"]