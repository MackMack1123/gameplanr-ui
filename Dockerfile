FROM node:20-slim AS build
WORKDIR /app

# Build the @gameplanr/ui package first.
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund
COPY tsconfig.json tsup.config.ts ./
COPY src ./src
RUN npm run build

# Build the docs site, which file-links to the parent package above.
COPY docs/package.json docs/package-lock.json* ./docs/
WORKDIR /app/docs
RUN npm ci --no-audit --no-fund
WORKDIR /app
COPY docs ./docs
COPY public ./public
WORKDIR /app/docs
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /app/docs/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 3000
