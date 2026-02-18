import { Injectable } from "@nestjs/common";
import { type ImageResponse } from "./images/interfaces/image.interface";
import { ImageService } from "./images/services/image.service";

@Injectable()
export class AppService {
    constructor(
        private readonly fetcher: ImageService,
    ) {}

    async create(image_url: string): Promise<ImageResponse> {
        const imageResponse = await this.fetcher.FetchAndSave(image_url);
        return imageResponse;
    }
}
