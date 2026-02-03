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

import { UrlDto } from "./url.dto";
import { UrlValidationPipe } from "./validation.pipe";

import { Image } from "./images/interfaces/image.interface";

import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Get()
    landingPage(@Res() res: Response) {
        return res.sendFile(join(__dirname, "..", "client", "main.html"));
    }

    @Get("images")
    async findAll(): Promise<Image[]> {
        return this.appService.findAll();
    }

    @Post()
    async create(@Body(new UrlValidationPipe()) url: UrlDto) {
        const image: Image = {
            url: url.incoming_value,
        };
        try {
            await this.appService.create(image);
            return `This action will returns ascii format of image url: ${url.incoming_value}`;
        } catch (e) {
            console.error(e);
            throw new HttpException(
                "Internal server error",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
