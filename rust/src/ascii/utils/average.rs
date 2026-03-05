use image::Rgba;

/// This function returns the average luminosity of a pixel
/// 
/// It's just the average of three 8-bit values
/// It needs the [Image](https://crates.io/crates/image) crate.
/// 
/// # Argument
/// * `pixel` a pixel which type is image::Rgba
///
/// # Result
/// * `u8` the average value
///
/// # Exemple
/// ```rust
/// use image::Rgba;
///
/// fn main()  {
///     let rgba = Rgba([128, 21, 21, 10]);
///     let value = to_average_rgb(rgba);
///     println!("{}", rgba);
/// }
pub fn to_average_rgb(pixel: Rgba<u8>) -> u8 {
    let sum: u16 = pixel[0] as u16 + pixel[1] as u16 + pixel[2] as u16;
    let result = sum / 3;
    result as u8
}

#[cfg(test)]
mod tests {
    use super::to_average_rgb;
    use image::Rgba;

    #[test]
    fn it_returns_the_darkest_ascii_char() {
        let rgba = Rgba([0, 0, 0, 10]);
        let result = to_average_rgb(rgba);
        assert_eq!(result, 0);
    }

    #[test]
    fn it_returns_a_dark_ascii_char() {
        let rgba = Rgba([128, 21, 21, 10]);
        let result = to_average_rgb(rgba);
        assert_eq!(result, 56);
    }

    #[test]
    fn it_returns_the_lightest_ascii_char() {
        let rgba = Rgba([255, 255, 255, 10]);
        let result = to_average_rgb(rgba);
        assert_eq!(result, 255);
    }
}
