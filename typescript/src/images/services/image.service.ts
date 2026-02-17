import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { fileTypeValidator } from "../utils/fileTypeValidator";

import { type ImageResponse } from "../interfaces/image.interface";

export async function FetchAndSave(url: string): Promise<ImageResponse> {
    const DATA_ROOT = join(process.cwd(), "images");
    await mkdir(DATA_ROOT, { recursive: true });

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Unable to fetch data ${url}`);
    }
    const buffer = await response.arrayBuffer();
    const image = Buffer.from(buffer);
    const imageFormat = fileTypeValidator(image);
    const imageName = uuidv4().concat(`.${imageFormat}`);
    await writeFile(
        join(DATA_ROOT, `${imageName}`),
        image,
    );
    return { name: imageName, buffer: image };
}
