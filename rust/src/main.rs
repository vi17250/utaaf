use serde::{Deserialize, Serialize};
use std::io;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::UnixStream;

mod server;
use server::create::unix_socket;

const SOCKET_PATH: &str = "/home/victor/nest_rust.sock";
const MAX_SIZE_IN_MB: usize = 10;

#[derive(Serialize, Deserialize)]
struct Message {
    id: u8,
    payload: String,
}

#[tokio::main]
async fn main() -> io::Result<()> {
    let listener = unix_socket(SOCKET_PATH).await?;
    println!("🚀 Socket ouverte: {}", SOCKET_PATH);

    loop {
        match listener.accept().await {
            Ok((stream, _addr)) => {
                tokio::spawn(async move { handle_client(stream).await });
            }
            Err(e) => return Err(e),
        }
    }
}

async fn handle_client(mut stream: UnixStream) -> io::Result<()> {
    println!("🔗 Client connecté");

    let mut buffer = vec![0_u8; 1024 * MAX_SIZE_IN_MB];
    // https://docs.rs/tokio/latest/tokio/io/trait.AsyncReadExt.html
    let buffer_size = stream.read(&mut buffer).await?;
    let payload = &buffer[..buffer_size];
    let message = String::from_utf8_lossy(payload);
    dbg!(message);

    let payload = Message {
        id: 42,
        payload: "Bonjour depuis Rust 🦀".into(),
    };

    let response = serde_json::to_string(&payload)?;
    let bytes = response.as_bytes();
    stream.write_all(bytes).await?;
    stream.flush().await?;
    Ok(())
}
