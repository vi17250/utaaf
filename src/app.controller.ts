import { Controller, Get, Res } from "@nestjs/common";
import { join } from "node:path";
import { type Response } from "express";

@Controller()
export class AppController {
    @Get()
    landingPage(@Res() res: Response) {
        return res.sendFile(join(__dirname, "..", "client", "main.html"));
    }

}
