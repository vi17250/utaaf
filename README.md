# UTAAF (*U*rl *T*o *A*scii *A*rt *Format*)

🐣 I'm currently under development, please wait 🐣

```
  __________
 / ___  ___ \
/ / @ \/ @ \ \
\ \___/\___/ /\
 \____\/____/||
 /     /\\\\\//
|     |\\\\\\
 \      \\\\\\
   \______/\\\\
    _||_||_

```

## What is utaaf

It's just a little web server to play with unix socket and ascii art and discover them.

## Installation

### Run

#### Locally

> Prerequisites

Install [NestJs](https://docs.nestjs.com/first-steps)
```bash
npm i -g @nestjs/cli
```

Install [Rustup](https://rustup.rs/)
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

You need to start both server

> Rust

```bash
cd rust/
cargo run
```

> NestJs

```bash
cd typescript/
npm run start 
```

#### Using docker

```bash
docker compose up
```

#### An then...
Go to [http://localhost:3000](http://localhost:3000)