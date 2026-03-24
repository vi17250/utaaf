type Size = {
    width: number, 
    height: number
}
export type AuthorizedTypes = "jpg" | "png" | "webp";

export type Result = {
    ascii: string
    name: string,
    extension: AuthorizedTypes,
    originalSize : Size,
    asciiSize: Size,
    resolution: number,
    pixelsProcessed: number,
}

export type FsParam = Pick<Result, "name">;
export type AsciiContent = Pick<Result, "ascii">;
