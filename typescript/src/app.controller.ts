import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Res,
} from "@nestjs/common";
import { type Response } from "express";

import { html } from "src/index";

import { Incoming_values } from "./dto/incoming.dto";
import { UrlValidationPipe } from "./pipes/urValidation.pipe";

import { AppService } from "./app.service";


@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Get()
    landingPage(@Res() res: Response) {
        return res.send(html);
    }

    @Get("favicon.ico")
    favicon(@Res() res: Response) {
        return res.json({ message: "I don't have favicon yet" });
    }

    @Post()
    async create(
        @Body(new UrlValidationPipe()) incoming: Incoming_values,
        @Res({ passthrough: true }) res: Response,
    ): Promise<void> {
        try {
            const imageResponse: string = await this.appService.create(
                incoming,
            );
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.setHeader(
                "Content-Disposition",
                'attachment; filename="image.txt"',
            );
            res.send(imageResponse);
        } catch (e) {
            console.error(e);
            throw new HttpException(
                "Internal server error",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
