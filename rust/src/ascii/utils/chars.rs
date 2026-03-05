/// This function returns the character based on a pixel 
/// and corresponding to it's luminosity
/// 
/// It's just the average of three 8-bit values
/// It needs the [Image](https://crates.io/crates/image) crate.
/// 
/// # Argument
/// * `element` the value representing the luminosity of a pixel
///
/// # Result
/// * `& 'static str` the corresponding character
///
/// # Exemple
/// ```rust
///
/// fn main()  {
///     let value = to_char(20);
///     println!("{}", value);
/// }
pub fn to_char(element: u8) -> &'static str {
    let index = (element / 32) as usize;
    let ascii: [&str; 8] = [".", ",", ";", "-", "~", "+", "=", "@"];
    ascii[index]
}

#[cfg(test)]
mod tests {
    use crate::ascii::utils::to_char;
    
    #[test]
    fn it_returns_the_lightest_ascii_char() {
        let result = to_char(0);
        assert_eq!(result, ".");
    }

    #[test]
    fn it_returns_the_darkest_ascii_char() {
        let result = to_char(255);
        assert_eq!(result, "@");
    }
}