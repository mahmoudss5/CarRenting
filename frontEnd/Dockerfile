# Stage 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --silent

COPY . ./

# Allow the backend URL to be injected at build time.
# In Docker Compose this is http://localhost:5000 (the host-mapped backend port
# that the user's browser can reach). The proxy is only used by `npm run dev`.
ARG VITE_API_URL=http://localhost:5000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve the static build with 'serve'
FROM node:20-alpine AS runtime
WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
