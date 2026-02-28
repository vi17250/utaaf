const jpgAuthorizeBuffer: Buffer = Buffer.from([0xff, 0xd8, 0xff]);
const pngAuthorizeBuffer: Buffer = Buffer.from([0x89, 0x50, 0x4e, 0x47]);


type AuthorizedTypes = "jpg" | "png";

export function fileTypeValidator(file: Buffer): AuthorizedTypes | Error {
    if (file.subarray(0,4).equals(pngAuthorizeBuffer)){
        return "png"
    }else if (file.subarray(0,3).equals(jpgAuthorizeBuffer)){
        return "jpg"
    }else{
        throw new Error("Bad image format")
    }
}
