import { Injectable } from "@nestjs/common";
import { ImageService } from "./images/services/image.service";
import { type Incoming_values } from "./types/incoming";

@Injectable()
export class AppService {
    constructor(
        private readonly fetcher: ImageService,
    ) {}

    async create(incoming_values: Incoming_values): Promise<string> {
        const imageResponse = await this.fetcher.FetchAndSave(incoming_values);
        return imageResponse;
    }
}
