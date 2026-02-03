import { Injectable } from "@nestjs/common";
import { Image } from "./images/interfaces/image.interface";
import { FetchAndSave } from "./images/services/image.service";

@Injectable()
export class AppService {
    private readonly images: Image[] = [];

    async create(image: Image) {
        await FetchAndSave(image.url);
        this.images.push(image);
    }

    findAll(): Image[] {
        return this.images;
    }
}
