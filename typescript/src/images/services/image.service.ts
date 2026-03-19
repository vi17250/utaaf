import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { fileTypeValidator } from "../utils/fileTypeValidator";
import { SocketService } from "src/unix_socket/socket.service";
import { ResponseDto } from "src/dto/response.dto";

import { type ImageResponse } from "../interfaces/image.interface";

@Injectable()
export class ImageService {
    constructor(private readonly socket: SocketService) {}

    async FetchAndSave(url: string): Promise<string> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Unable to fetch data ${url}`);
        }
        const buffer = await response.arrayBuffer();
        const image = Buffer.from(buffer);
        fileTypeValidator(image);
        const bufferResponse = await this.socket.send(image);
        const jsonData: ImageResponse = JSON.parse(bufferResponse.toString());
        const responseDto = plainToInstance(ResponseDto, jsonData);
        const errors = await validate(responseDto);
        if (errors.length > 0) {
            const errors_string = errors.map(({ target, constraints }) =>
                JSON.stringify({ constraints, target })
            ).join(" | ");
            throw new Error(errors_string);
        }
        return jsonData.ascii;
    }
}
