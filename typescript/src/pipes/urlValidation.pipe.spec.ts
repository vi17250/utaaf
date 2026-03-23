import { Test, TestingModule } from "@nestjs/testing";
import { UrlValidationPipe } from "./urValidation.pipe";
import { Incoming_values } from "../dto/incoming.dto";
import { BadRequestException } from "@nestjs/common";

describe("url validation pipe", () => {
    let pipe: UrlValidationPipe;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UrlValidationPipe],
        }).compile();

        pipe = module.get<UrlValidationPipe>(UrlValidationPipe);
    });

    it("should pass validation for a correct URL", async () => {
        const validDto: Incoming_values = {
            url: "https://example.com/path",
            scale: 2,
        };
        const result = await pipe.transform(validDto, {
            type: "body",
            metatype: Incoming_values,
        });
        expect(result).toEqual(validDto);
    });

    it("should throw new BadRequestException for incorrect url", async () => {
        const invalidDto: Incoming_values = { url: "invalid-url", scale: 2 };
        await expect(pipe.transform(invalidDto, {
            type: "body",
            metatype: Incoming_values,
        })).rejects.toThrow(BadRequestException);
    });

    it("should throw new BadRequestException for incorrect scale", async () => {
        const invalidDto: Incoming_values = {
            url: "https://example.com/path",
            scale: 1,
        };
        await expect(pipe.transform(invalidDto, {
            type: "body",
            metatype: Incoming_values,
        })).rejects.toThrow(BadRequestException);
    });
});
