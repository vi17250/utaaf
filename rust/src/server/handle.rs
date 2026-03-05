use serde::Serialize;
use std::io;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::UnixStream;

use crate::HEADER_LENGTH;

use crate::ascii;

#[derive(Serialize)]
struct BufferResponse {
    ascii: String,
}

/// Returns the data buffer of a stream
///
/// It's very important that the first four bytes are the header,
/// which indicate the length of the payload. (const HEADER_LENGTH).
/// This function first reads the header, then reads the payload, and returns it.
///
/// # Global variable
/// * `HEADER_LENGTH`: usize
///
/// # Argument
/// * `stream` a mutable reference to a UnixStream
///
/// # Return
/// * `Ok(Vec<u8>)` the data buffer of the payload
/// * `Err(std::io::Error)` A specialized Error type I/O operations
///
/// # Exemple
/// ```no_run
/// use std::os::unix::net::UnixStream;
/// use tokio::io::AsyncReadExt;
///
/// #[tokio::main]
/// async fn main() -> std::io::Result<()> {
///     let mut stream = UnixStream::connect("/tmp/my_app.sock")?;
///     let payload = get_payload(&mut stream).await?;
///     println!("Payload : {} bytes", payload.len());
///     Ok(())
/// }
pub async fn get_payload(stream: &mut UnixStream) -> io::Result<Vec<u8>> {
    let mut header = [0_u8; HEADER_LENGTH];
    stream.read_exact(&mut header).await?;
    let payload_len = u32::from_be_bytes(header) as usize;
    let mut buffer = vec![0_u8; payload_len];
    stream.read_exact(&mut buffer).await?;
    Ok(buffer)
}

/// Invoke an ASCII creator and write the result in a stream
///
/// This function takes the ownership of the unix stream.
/// First it retrieves the payload
/// Then it calls the `ascii` module to generate the representation of the image.
/// Finally it write the result in the stream
///
/// # Argument
/// * `stream` the ownership of the stream
///
/// # Return
/// * `Ok(())`
/// * `Err(std::io::Error)` A specialized Error
///
/// # Exemple
/// ```no_run
/// use std::os::unix::net::UnixStream;
/// use tokio::io::AsyncReadExt;
///
/// #[tokio::main]
/// async fn main() -> std::io::Result<()> {
///     let mut stream = UnixStream::connect("/tmp/my_app.sock")?;
///     generate_ascii(stream).await?;
///     Ok(())
/// }
pub async fn generate_ascii(mut stream: UnixStream) -> io::Result<()> {
    println!("🔗 Client connected");
    let payload = get_payload(&mut stream).await?;

    let ascii = ascii::create(payload).unwrap();

    let response_str = serde_json::to_string(&BufferResponse { ascii })?;

    stream.write_all(response_str.as_bytes()).await?;
    stream.flush().await?;

    Ok(())
}
