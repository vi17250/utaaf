import { Injectable } from "@nestjs/common";
import { type ImageResponse } from "./images/interfaces/image.interface";
import { FetchAndSave } from "./images/services/image.service";

@Injectable()
export class AppService {

    async create(image_url: string): Promise<ImageResponse> {
        const imageResponse = await FetchAndSave(image_url);
        return imageResponse;
    }
}
