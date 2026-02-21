use serde::{Deserialize, Serialize};
use std::io;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::UnixStream;

mod server;
use server::create::unix_socket;

const SOCKET_PATH: &str = "/home/victor/nest_rust.sock";
const HEADER_LENGTH: usize = 4;

#[derive(Serialize, Deserialize, Debug)]
struct BufferResponse {
    payload_len: usize,
    buffer_len: usize,
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

    let mut header = [0_u8; HEADER_LENGTH];
    stream.read_exact(&mut header).await?;
    let payload_len = u32::from_be_bytes(header) as usize;
    let mut buffer = vec![0_u8; payload_len];
    stream.read_exact(&mut buffer).await?;
    let buffer_len = buffer.len();

    let response = BufferResponse {
        payload_len,
        buffer_len,
    };

    let response_str = serde_json::to_string(&response)?;
    dbg!(&response_str);

    stream.write_all(response_str.as_bytes()).await?;
    stream.flush().await?;

    Ok(())
}
