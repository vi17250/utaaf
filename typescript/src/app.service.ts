import { Injectable } from "@nestjs/common";
import { ImageService } from "./images/services/image.service";
import { type Incoming_values } from "./types/incoming";
import { FsParam, Result } from "./images/types";

@Injectable()
export class AppService {
    constructor(
        private readonly service: ImageService,
    ) {}

    async create(incoming_values: Incoming_values): Promise<Result> {
        const imageResponse = await this.service.FetchAndSave(incoming_values);
        return imageResponse;
    }
    async getFileContent({ name }: FsParam): Promise<string> {
        const imageResponse = await this.service.GetFile({ name });
        return imageResponse.ascii;
    }
}
