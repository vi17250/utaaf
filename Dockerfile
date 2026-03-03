FROM node:latest AS web-server

WORKDIR /app/typescript

COPY typescript/package*.json .

RUN npm ci --only=production && npm cache clean --force

COPY typescript/ .

ENV NODE_ENV=production
RUN npm run build

FROM node:25-alpine

COPY .env .

COPY --from=web-server ./app/typescript/dist ./app/typescript
COPY --from=web-server ./app/typescript/node_modules ./app/typescript/node_modules

COPY ./entrypoint-docker.sh .
RUN chmod +x ./entrypoint-docker.sh

ENTRYPOINT ["./entrypoint-docker.sh"]