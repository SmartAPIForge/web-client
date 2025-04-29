FROM node:lts AS base
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN npm install

FROM base AS dev-deps
# First install all dependencies
RUN npm install

# Build stage
FROM dev-deps AS build
COPY . .
RUN npm run build

# Runtime for production
FROM base AS runtime-prod
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]

# Runtime for development
FROM base AS runtime-dev
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["npm", "run", "dev"]