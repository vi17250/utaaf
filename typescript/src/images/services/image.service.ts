import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { v4 as uuidV4 } from "uuid";

import { fileTypeValidator } from "../utils/fileTypeValidator";
import { SocketService } from "src/unix_socket/socket.service";
import { ResponseDto } from "src/dto/response.dto";

import { type ImageResponse } from "../interfaces/image.interface";
import { Incoming_values } from "src/types/incoming";
import { AsciiContent, FsParam, Result } from "../types";

@Injectable()
export class ImageService {
    constructor(private readonly socket: SocketService) {}

    async FetchAndSave(incoming_value: Incoming_values): Promise<Result> {
        const response = await fetch(incoming_value.url);
        if (!response.ok) {
            throw new Error(`Unable to fetch data ${incoming_value.url}`);
        }
        const buffer = await response.arrayBuffer();
        const image = Buffer.from(buffer);
        const fileType = fileTypeValidator(image);
        const bufferResponse = await this.socket.send(
            image,
            incoming_value.resolution,
        );
        const data: ImageResponse = JSON.parse(bufferResponse.toString());
        const imageMetadata = plainToInstance(ResponseDto, data);
        const errors = await validate(imageMetadata);
        if (errors.length > 0) {
            const errors_string = errors.map(({ target, constraints }) =>
                JSON.stringify({ constraints, target })
            ).join(" | ");
            throw new Error(errors_string);
        }
        let uuid = uuidV4();
        let fileName = uuid.slice(0, 8);
        if (!existsSync("./../results")) {
            await mkdir("./../results");
        }
        await writeFile(
            `./../results/${fileName}`,
            imageMetadata.ascii,
            "utf-8",
        );
        return {
            name: fileName,
            extension: fileType,
            originalSize: imageMetadata.original_size,
            asciiSize: imageMetadata.ascii_size,
            resolution: imageMetadata.resolution,
            pixelsProcessed: imageMetadata.pixels_processed,
            ascii: imageMetadata.ascii,
        };
    }

    async GetFile({ name }: FsParam): Promise<AsciiContent> {
        const content = await readFile(`./../results/${name}`, "utf-8");
        return { ascii: content };
    }
}
