use serde::{Deserialize, Serialize};
use std::io;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::UnixStream;

use crate::HEADER_LENGTH;

#[derive(Serialize, Deserialize, Debug)]
struct BufferResponse {
    payload: String,
}
/// Retourne le buffer d'un stream passé en paramètre
///
/// Il est impératif que les premiers octets représentent l'en-tête.
/// Cet en-tête contient la taille totale du message (const `HEADER_LENGTH`).
///
/// # Variable globale
/// * `HEADER_LENGTH`: usize
///
/// # Argument
/// * `stream` la référnce mutable vers un stream unix
///
/// # Retour
/// `Ok(Vec<u8>)` où `Vec<u8>` représente le payload sous forme de buffer
/// `Err(io::Error)` une erreur si la lecture échoue ou si le nombre d'octets
/// indiqué dans l'en-tête n'est pas lu correctement
pub async fn get_payload(stream: &mut UnixStream) -> io::Result<Vec<u8>> {
    let mut header = [0_u8; HEADER_LENGTH];
    stream.read_exact(&mut header).await?;
    let payload_len = u32::from_be_bytes(header) as usize;
    let mut buffer = vec![0_u8; payload_len];
    stream.read_exact(&mut buffer).await?;
    Ok(buffer)
}

pub async fn client(mut stream: UnixStream) -> io::Result<()> {
    println!("🔗 Client connecté");
    let _payload = get_payload(&mut stream).await?;

    let response_str = serde_json::to_string(&BufferResponse {
        payload: "Ici l'image en Ascii art".to_string(),
    })?;

    stream.write_all(response_str.as_bytes()).await?;
    stream.flush().await?;

    Ok(())
}
