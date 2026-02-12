import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Res,
} from "@nestjs/common";
import { join } from "node:path";
import { type Response } from "express";

import { UrlDto } from "./dto/url.dto";
import { UrlValidationPipe } from "./pipes/urValidation.pipe";

import { type ImageResponse } from "./images/interfaces/image.interface";

import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Get()
    landingPage(@Res() res: Response) {
        return res.sendFile(join(__dirname, "../..", "client", "main.html"));
    }

    @Get("favicon.ico")
    favicon(@Res() res: Response) {
        return res.json({ message: "I don't have favicon yet" });
    }

    @Post()
    async create(
        @Body(new UrlValidationPipe()) url: UrlDto,
    ): Promise<ImageResponse> {
        try {
            const imageResponse: ImageResponse = await this.appService.create(
                url.incoming_value,
            );
            return imageResponse;
        } catch (e) {
            console.error(e);
            throw new HttpException(
                "Internal server error",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
