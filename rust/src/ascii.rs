use image::load_from_memory;

use crate::server::structs::Payload;

mod generator;
use generator::generate;
mod structs;
mod utils;

/// Create a DynamicImage from a payload and invoke an ASCII generator function
///
/// This function needs the [Image](https://crates.io/crates/image) crate.
///
/// # Argument
/// * `payload` the struct including `image` and `resolution`
///
/// # Result
/// * `Ok(String)` the ascii representation of the image
/// * `Err()` An error if loading or processing fails
///
/// # Exemple
/// ```rust
/// use image::{load_from_memory};
///
/// fn main() -> Result<String, Box<dyn std::error::Error>> {
///     let buffer = std::fs::read("image.png")?;
///     let result = create(buffer)?;
///     println!("Résultat: {}", result);
/// }
pub fn create(payload: Payload) -> Result<structs::Result, Box<dyn std::error::Error>> {
    let image = load_from_memory(&payload.image)?;
    let resolution = payload.resolution;
    let result = generate(image, resolution);
    Ok(result)
}
