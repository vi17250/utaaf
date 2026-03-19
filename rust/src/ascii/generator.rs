use image::{DynamicImage, GenericImageView};

use super::utils::{to_char, to_average_rgb};

/// Generate an ascii representation of a DynamicImage
/// 
/// This function scans an image pixel by pixel using a scale based sampling
/// and returns a character based on the pixel luminosity
/// It needs the [Image](https://crates.io/crates/image) crate.
///
/// # Argument
/// * `image` the DynamycImage
///
/// # Result
/// * `String` the ascii representation of the image
///
/// # Exemple
/// ```rust
/// use image::{open, DynamicImage};
///
/// fn main()  {
///     let img = open("input.png")?.to_dynamic_image();
///     let ascii = generate(img);
///     println!("{}", ascii);
/// }
pub fn generate(image: DynamicImage) -> String {
    let (width, height) = image.dimensions();
    let scale = 2;
    let mut matrix: String = String::new();
    for y in 0..height {
        for x in 0..width {
            if y % (scale * 2) == 0 && x % scale == 0 {
                let pixel = image.get_pixel(x, y);
                let char = to_char(to_average_rgb(pixel));
                matrix.push_str(char);
            }
        }
        if y % (scale * 2) == 0 {
            matrix.push_str("\n");
        }
    }
    matrix
}
