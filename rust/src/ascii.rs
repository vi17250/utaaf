use image::load_from_memory;

mod generator;
use generator::generate;
mod utils;

/// Create a DynamicImage from a buffer and invoke an ASCII generator function
///
/// This function needs the [Image](https://crates.io/crates/image) crate.
///
/// # Argument
/// * `buffer` the data buffer of the image
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
pub fn create(buffer: Vec<u8>) -> Result<String, Box<dyn std::error::Error>> {
    let image = load_from_memory(&buffer)?;
    let result = generate(image);
    Ok(result)
}
