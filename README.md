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

It's just a little web server to play with [unix socket](https://en.wikipedia.org/wiki/Unix_domain_socket) and [ascii art](https://en.wikipedia.org/wiki/ASCII_art).

## Summary
- [Use locally by starting all servers](#starting-all-servers)
- [Use locally with _docker compose_](#use-docker-compose)

### Starting all servers

You need to start a [NestJs](https://nestjs.com/) web Server and a [Rust](https://rust-lang.org/fr/) socker server which converts the data into Ascii Art.

#### NestJs Web Server

1. Go to `./typescript`
2. Run 
```bash
  npm i
  npm run start
``` 

#### Rust web socket server

1. Go to `./rust`
2. Run
```bash
  cargo run
```

### Use docker compose

```bash
docker compose up
```

### An then...
Go to [http://localhost:3000](http://localhost:3000)