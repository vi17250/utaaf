use image::{DynamicImage, GenericImageView};

use super::utils::{to_average_rgb, to_char};

use crate::ascii::structs::{Result, Size};

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
/// * `Result` the ascii representation of the image with it's metadata
///
/// # Exemple
/// ```rust
/// use image::{open, DynamicImage};
///     let img = open("input.png")?.to_dynamic_image();
///     let ascii = generate(img);
///     println!("{}", ascii);
/// ```
pub fn generate(image: DynamicImage, resolution: u32) -> Result {
    let (width, height) = image.dimensions();
    let original_size = { Size { width, height } };
    let ascii_size = {
        Size {
            width: width / resolution,
            height: height / resolution / 2,
        }
    };
    let mut pixels_processed = 0;
    let mut ascii = String::new();
    for y in 0..height {
        for x in 0..width {
            if y % (resolution * 2) == 0 && x % resolution == 0 {
                let pixel = image.get_pixel(x, y);
                let char = to_char(to_average_rgb(pixel));
                ascii.push_str(char);
                pixels_processed += 1;
            }
        }
        if y % (resolution * 2) == 0 {
            ascii.push('\n');
        }
    }
    Result {
        original_size,
        ascii_size,
        resolution,
        pixels_processed,
        ascii,
    }
}
