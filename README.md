# UTAAF (*U*rl *T*o *A*scii *A*rt _Format_) 🐦

<img width="643" height="563" alt="Copie d&#39;écran_20260319_145220" src="https://github.com/user-attachments/assets/5ceb2fa2-ca7a-4c22-a2a7-322f18b09e13" />

## Summary

- 🦜 [What it utaaf](#what-is-utaaf)
- 🐳 [Use locally with _docker compose_](#use-docker-compose)
- 🖥️ [Use locally by starting all servers](#starting-all-servers)

## 🦜 What is utaaf

A little web server to play with
[unix socket](https://en.wikipedia.org/wiki/Unix_domain_socket) and
[ascii art](https://en.wikipedia.org/wiki/ASCII_art).

### 🐳 Use docker compose

```bash
docker compose up
```

### 🖥️ Starting all servers

You need to create _.env_ file, and then you need to start a
[NestJs](https://nestjs.com/) web Server and a [Rust](https://rust-lang.org/fr/)
socker server which converts the data into Ascii Art.

#### Prerequisites

Install [nodeJs](https://nodejs.org/en/download) and [Rust](https://rust-lang.org/learn/get-started/)

#### Create _.env_ file

```bash
  cp .env.example .env
```

#### NestJs Web Server

```bash
cd /typescript
npm i
npm run start
```

#### Rust web socket server

```bash
cd /rust
cargo run
```

### 🚀 An then...

Go to [http://localhost:3000](http://localhost:3000)
