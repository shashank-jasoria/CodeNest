# ---- Stage 1: Build the frontend ----
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend

# Copy only package files first, to cache dependencies
COPY package*.json ./
RUN npm ci

# Copy all frontend source and config files
COPY src ./src
COPY public ./public
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

# Build the frontend (output goes to /app/frontend/dist)
RUN npm run build


# ---- Stage 2: Build the backend ----
FROM node:20-slim AS backend-build
WORKDIR /app/backend

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm ci

# Copy backend source and TypeScript config
COPY backend/tsconfig.json ./
COPY backend/src ./src

# Build the backend TypeScript (output goes to /app/backend/dist)
RUN npm run build


# ---- Stage 3: Final production image ----
FROM node:20-slim AS production

# Install the compilers and runtimes your code needs
RUN apt-get update && apt-get install -y \
    g++ \
    gcc \
    python3 \
    default-jdk \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/bin/python3 /usr/bin/python

# Set up the working directory for the backend
WORKDIR /app/backend

# Copy the backend's compiled output and its production node_modules
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY --from=backend-build /app/backend/package*.json ./

# Copy the frontend build output to /app/dist
# (your server expects ../../dist from backend/dist → /app/dist)
COPY --from=frontend-build /app/frontend/dist /app/dist

# Render provides a PORT environment variable; your server already uses it.
ENV PORT=3300
EXPOSE 3300

# Start the backend server from the backend folder
CMD ["node", "dist/index.js"]