use image::{DynamicImage, GenericImageView};

use super::utils::{to_average_rgb, to_char};

/// Generate an ascii representation of a DynamicImage
///
/// This function scans an image pixel by pixel using a resolution based sampling
/// and returns a character based on the pixel luminosity
/// It needs the [Image](https://crates.io/crates/image) crate.
///
/// # Argument
/// * `image` the DynamycImage
/// * `resolution` the resolution used to reduce the resolution
///
/// # Result
/// * `String` the ascii representation of the image
///
/// # Exemple
/// ```rust
/// use image::{open, DynamicImage};
///     let img = open("input.png")?.to_dynamic_image();
///     let ascii = generate(img);
///     println!("{}", ascii);
/// ```
pub fn generate(image: DynamicImage, resolution: u32) -> String {
    let (width, height) = image.dimensions();
    let mut matrix: String = String::new();
    for y in 0..height {
        for x in 0..width {
            if y % (resolution * 2) == 0 && x % resolution == 0 {
                let pixel = image.get_pixel(x, y);
                let char = to_char(to_average_rgb(pixel));
                matrix.push_str(char);
            }
        }
        if y % (resolution * 2) == 0 {
            matrix.push('\n');
        }
    }
    matrix
}
