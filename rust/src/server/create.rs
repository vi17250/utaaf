use std::ffi::OsString;
use std::fs;
use std::path::Path;
use tokio::io;
use tokio::net::UnixListener;

pub async fn unix_socket(socket_path: &str) -> io::Result<UnixListener> {
    let socket_path: OsString = OsString::from(socket_path);
    
    if Path::new(&socket_path).exists() {
        fs::remove_file(&socket_path)?;
    }

    UnixListener::bind(socket_path)
}
