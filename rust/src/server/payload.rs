use std::io;
use serde::Deserialize;
use tokio::io::AsyncReadExt;
use tokio::net::UnixStream;
use hex;

use crate::HEADER_LENGTH;
use crate::server::structs::Payload;

#[derive(Deserialize, Debug)]
struct RequestPayload {
    scale: u32,
    image: String,
}

/// Returns the payload of a stream
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
/// * `Ok(Payload)` the payload containing the image Buffer and the scale value
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
pub async fn extract(stream: &mut UnixStream) -> io::Result<Payload> {
    let mut header = [0_u8; HEADER_LENGTH];
    stream.read_exact(&mut header).await?;
    let payload_len = u32::from_be_bytes(header) as usize;
    let mut buffer = vec![0_u8; payload_len];
    stream.read_exact(&mut buffer).await?;
    let request_payload: RequestPayload = match serde_json::from_slice(&buffer) {
        Ok(payload) => payload,
        Err(e) => {
            return Err(e.into());
        }
    };
    let image = hex::decode(request_payload.image).expect("Failed to decode Image");
    let payload = Payload {
        scale: request_payload.scale,
        image,
    };
    Ok(payload)
}
