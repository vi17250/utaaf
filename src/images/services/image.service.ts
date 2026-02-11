import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { fileTypeValidator } from "../utils/fileTypeValidator";

export async function FetchAndSave(url: string): Promise<void> {
    const DATA_ROOT = join(process.cwd(), "images");
    await mkdir(DATA_ROOT, { recursive: true });

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Unable to fetch data ${url}`);
    }
    const buffer = await response.arrayBuffer();
    const image = Buffer.from(buffer);
    const imageformat = fileTypeValidator(image);
    const image_name = uuidv4().concat(`.${imageformat}`);
    await writeFile(
        join(DATA_ROOT, `${image_name}`),
        image,
    );
}
