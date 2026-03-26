use serde::Deserialize;

/// The payload streamed using the unix socket
#[derive(Deserialize, Debug)]
pub struct Payload {
    pub resolution: u32,
    pub image: Vec<u8>,
}
