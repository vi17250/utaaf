use image::load_from_memory;

use crate::server::structs::Payload;

mod generator;
use generator::generate;
mod utils;

/// Create a DynamicImage from a payload and invoke an ASCII generator function
///
/// This function needs the [Image](https://crates.io/crates/image) crate.
///
/// # Argument
/// * `payload` the struct including `image` and `scale`
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
pub fn create(payload: Payload) -> Result<String, Box<dyn std::error::Error>> {
    let image = load_from_memory(&payload.image)?;
    let scale = payload.scale;
    let result = generate(image, scale);
    Ok(result)
}
