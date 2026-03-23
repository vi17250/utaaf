//! # Buffer image to ascii convertor 
//! 
//! # This app is both:
//! - a unix socket server listening and waiting for a stream
//! - a tool using to convert image buffer array to ascii art 
use std::{env, io};

mod server;
use server::create::unix_socket;
use server::handle::generate_ascii;

mod ascii;

const HEADER_LENGTH: usize = 4;

/// *Main* is the entry point of the crate
/// 
/// This soft needs an .env value called *"SOCKET_PATH"* which represent the path where
/// the unix socket will be written.
/// 
/// Workflow: 
/// 1. **Initialisation** load .env variables (panic if it fails)
/// 2. **Create server** Setup a bidirectional communication server
/// 3. **Listen** Infinite loop listening streams
/// 4. **Processing** Async processing will convert buffer data to *ASCII Art*
/// 
/// # Environment variable
/// * `SOCKET_PATH`: String
/// 
/// # Global variable
/// * `HEADER_LENGTH`: usize
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
                tokio::spawn(async move { generate_ascii(stream).await });
            }
            Err(e) => return Err(e),
        }
    }
}
