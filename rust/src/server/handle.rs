use std::io;
use tokio::io::AsyncWriteExt;
use tokio::net::UnixStream;

use crate::ascii;

use crate::server::payload;

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
    let payload = payload::extract(&mut stream).await?;

    let result = ascii::create(payload).expect("Failed to create ascii");

    let response_str = serde_json::to_string(&result)?;

    stream.write_all(response_str.as_bytes()).await?;
    stream.flush().await?;

    Ok(())
}
