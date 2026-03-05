use std::ffi::OsString;
use std::fs;
use std::path::Path;
use tokio::io;
use tokio::net::UnixListener;

/// Creates a **unix_socket** server and returns the listener
/// 
/// This function ensures that the socket doesn't exist.
/// If it does exist, it's deleted before being recreated
/// 
/// # Argument
/// * `socket_path` the path to the socket to be created
/// 
/// # Return
/// * `Ok(UnixListener)` A unix listener instance ready to accept connections
/// * `Err(std::io::Error)` A specialized Error type I/O operations
/// 
/// # Example
///
/// ```rust
/// use std::io;
/// use tokio::net::UnixListener;
///
/// #[tokio::main]
/// async fn main() -> io::Result<()> {
///     let listener = unix_socket("/tmp/my_app.sock").await?;
///     
///     println!("🚀 Socket listening : /tmp/my_app.sock");
///     
///     loop {
///         let (stream, addr) = listener.accept().await?;
///         // Do something
///     }
/// }
/// ```
pub async fn unix_socket(socket_path: &str) -> io::Result<UnixListener> {
    let socket_path: OsString = OsString::from(socket_path);
    
    if Path::new(&socket_path).exists() {
        fs::remove_file(&socket_path)?;
    }

    UnixListener::bind(socket_path)
}
