import { Test, TestingModule } from "@nestjs/testing";
import { UrlValidationPipe } from "./urValidation.pipe";
import { UrlDto } from "../dto/url.dto";
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
        const validDto: UrlDto = { incoming_value: "https://example.com/path" };
        const result = await pipe.transform(validDto, {
            type: "body",
            metatype: UrlDto,
        });
        expect(result).toEqual(validDto);
    });

    it("should throw new BadRequestException", async () => {
        const invalidDto: UrlDto = { incoming_value: "invalid-url" };
        await expect(pipe.transform(invalidDto, {
            type: "body",
            metatype: UrlDto,
        })).rejects.toThrow(BadRequestException);
    });
});
