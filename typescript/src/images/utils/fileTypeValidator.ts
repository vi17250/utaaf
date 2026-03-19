const jpgAuthorizeBuffer: Buffer = Buffer.from([0xff, 0xd8, 0xff]);
const pngAuthorizeBuffer: Buffer = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const riffSignature: Buffer = Buffer.from([0x52, 0x49, 0x46, 0x46]);
const webPAuthorizedBuffer: Buffer = Buffer.from([0x57, 0x45, 0x42, 0x50]);

type AuthorizedTypes = "jpg" | "png" | "webp";

export function fileTypeValidator(file: Buffer): AuthorizedTypes | Error {
    if (file.subarray(0, 4).equals(pngAuthorizeBuffer)) {
        return "png";
    } else if (file.subarray(0, 3).equals(jpgAuthorizeBuffer)) {
        return "jpg";
    } else if (
        file.length >= 12 &&
        file.subarray(0, 4).equals(riffSignature) &&
        file.subarray(8, 12).equals(webPAuthorizedBuffer)
    ) {
        return "webp";
    } else {
        throw new Error("Bad image format");
    }
}
