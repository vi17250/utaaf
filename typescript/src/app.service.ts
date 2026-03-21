import { Injectable } from "@nestjs/common";
import { ImageService } from "./images/services/image.service";

@Injectable()
export class AppService {
    constructor(
        private readonly fetcher: ImageService,
    ) {}

    async create(image_url: string, scale: number): Promise<string> {
        const imageResponse = await this.fetcher.FetchAndSave(image_url, scale);
        return imageResponse;
    }
}
