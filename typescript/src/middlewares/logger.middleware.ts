import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { type RequestUUID } from "src/types/request";

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    use(req: RequestUUID, res: Response, next: NextFunction) {
        const uuid: string = uuidv4();
        req.traceId = uuid;
        next();
    }
}
