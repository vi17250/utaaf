import {  readFileSync } from "fs";
import { fileTypeValidator } from "./fileTypeValidator";

describe("file type validator", () => {
    it("should should returns `jpg` for an JPEG image", async () => {
        const file: Buffer = readFileSync("./__fixture__/image_jpg.jpg");
        const imageFormat = fileTypeValidator(file);
        expect(imageFormat).toEqual("jpg");
    });
    it("should should returns `png` for an PNG image", async () => {
        const file: Buffer = readFileSync("./__fixture__/image_png.png");
        const imageFormat = fileTypeValidator(file);
        expect(imageFormat).toEqual("png");
    });
    it("should throw an error", () => {
        const file: Buffer = readFileSync("./__fixture__/fail.ts");
        const imageFormat = () => fileTypeValidator(file);
        expect(imageFormat).toThrow(Error);
    });
});
