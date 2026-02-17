import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from "@nestjs/common";
import { type Response } from "express";
import { type RequestUUID } from "src/types/request";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<RequestUUID>();

        const traceId = request.traceId;

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const clientPayload = {
            error: HttpStatus[status],
            traceId,
        };

        const logObject: Record<string, any> = {
            traceId,
            method: request.method,
            url: request.originalUrl,
            ip: request.ip,
            ...(exception instanceof Error && {
                message: exception.message,
                stack: exception.stack,
            }),
            ...(exception instanceof HttpException && {
                response: exception.getResponse(),
            }),
        };

        this.logger.error(`Error ${traceId}`, JSON.stringify(logObject));
        response.status(status).json(clientPayload);
    }
}
