###################
FROM node:latest AS web-server
###################

WORKDIR /app/typescript

COPY typescript/package*.json .

RUN npm ci && npm cache clean --force

COPY typescript/ .

ENV NODE_ENV=production

RUN npm run build

###################
FROM rust:latest AS ascii-server
###################

WORKDIR /app/rust

COPY ./rust .

RUN rustup target add x86_64-unknown-linux-musl
RUN cargo build --release --target x86_64-unknown-linux-musl

###################
FROM node:25-alpine
###################

COPY .env .

COPY --from=web-server ./app/typescript/dist ./app/typescript
COPY --from=web-server ./app/typescript/node_modules ./app/typescript/node_modules
COPY --from=ascii-server /app/rust/target/x86_64-unknown-linux-musl/release/rust /app/rust/ascii-server

COPY ./typescript/package.json .
COPY ./entrypoint-docker.sh .
RUN chmod +x ./entrypoint-docker.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint-docker.sh"]