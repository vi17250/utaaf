import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { join } from "node:path";
import { type Response } from "express";

import { UrlDto } from "./url.dto";
import { UrlValidationPipe } from "./validation.pipe";

@Controller()
export class AppController {
    @Get()
    landingPage(@Res() res: Response) {
        return res.sendFile(join(__dirname, "..", "client", "main.html"));
    }

    @Post()
    async create(@Body(new UrlValidationPipe()) url: UrlDto) {
        return `This action will returns ascii format of image url: ${url.incoming_value}`;
    }
}
