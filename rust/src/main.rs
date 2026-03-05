use std::{env, io};

mod server;
use server::create::unix_socket;
use server::handle::client;

const HEADER_LENGTH: usize = 4;

#[tokio::main]
async fn main() -> io::Result<()> {
    dotenv::dotenv().ok();
    let socket_path = match env::var("SOCKET_PATH") {
        Ok(path) => path,
        Err(_) => panic!("You need to add `SOCKET_PATH` env var"),
    };

    let listener = unix_socket(&socket_path).await?;
    println!("🚀 Socket ouverte: {}", socket_path);

    loop {
        match listener.accept().await {
            Ok((stream, _addr)) => {
                tokio::spawn(async move { client(stream).await });
            }
            Err(e) => return Err(e),
        }
    }
}
