use serde::Serialize;

#[derive(Serialize)]
pub struct Size {
    pub width: u32,
    pub height: u32,
}

#[derive(Serialize)]
pub struct Result {
    pub original_size: Size,
    pub ascii_size: Size,
    pub resolution: u32,
    pub pixels_processed: usize,
    pub ascii: String,
}
