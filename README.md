# UTAAF (*U*rl *T*o *A*scii *A*rt _Format_) 🐦

<img width="643" height="563" alt="Copie d&#39;écran_20260319_145220" src="https://github.com/user-attachments/assets/5ceb2fa2-ca7a-4c22-a2a7-322f18b09e13" />

## Summary

- 🦜 [What it utaaf](#-what-is-utaaf)
- 🐳 [Use locally with _docker compose_](#-using-docker-compose)
- 🖥️ [Use locally by starting all servers](#️-starting-all-servers)
- 🚀 [And then...](#-and-then)
- 📊 [Sequence diagram](#-sequence-diagram)

## 🦜 What is utaaf

A little web server to play with
[unix socket](https://en.wikipedia.org/wiki/Unix_domain_socket) and
[ascii art](https://en.wikipedia.org/wiki/ASCII_art).

With _utaaf_ you can paste a image URL and generate a text based (ASCII) representation of it

### 🐳 Use locally with _docker compose_

```bash
docker compose up
```

### 🖥️ Use locally by starting all servers

You need to create _.env_ file, and then you need to start a
[NestJs](https://nestjs.com/) web Server and a [Rust](https://rust-lang.org/fr/)
socker server which converts the data into Ascii Art.

#### Prerequisites ⚠️

Install [nodeJs](https://nodejs.org/en/download) and
[Rust](https://rust-lang.org/learn/get-started/)

#### Create _.env_ file 📃

```bash
cp .env.example .env
```

#### NestJs Web Server 😺

```bash
cd /typescript
npm i
npm run start
```

#### Rust web socket server 🦀

```bash
cd /rust
cargo run
```

### 🚀 And then...

Go to [http://localhost:3000](http://localhost:3000)

### 📊 Sequence diagram 

```mermaid
sequenceDiagram;
    autonumber
    participant C as Client
    participant S as Web server
    participant I as Internet
    participant R as Rust app

    C->>S: POST / 
    Note right of C: Body<br/> {'url': string, 'resolution': number}
    S-->>I: `fetch` an image URL
    I-->>S: Image
    S->>S: Convert to buffer array
    Note right of S: Payload<br/> {'image': string, 'resolution': number}
    S->>R: Unix socket     
    Note right of S: Payload<br/> {'original_size': {'width': number, 'height': number},<br/>ascii_size: {'width': number, 'height': number},<br/>resolution: number,pixels_processed: number, ascii: string}
    R->>S: Unix socket
    S->>C: 200 OK
    Note right of C: Body<br/>{'name': string, 'extension': string,<br/>originalSize: {'width': number, 'height': number},<br/>asciiSize: {'width': number, 'height': number},<br/>resolution: number,pixelsProcessed:number, ascii: string}
    C->>S: GET /files/{name}/download
    S->>C: 200 OK
    Note right of C: Header<br/>'Content-Type', 'text/plain'<br/>'Content-Disposition','attachment filename={name}.txt'
```
