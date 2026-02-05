import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function FetchAndSave(url: string): Promise<void> {
    const DATA_ROOT = join(process.cwd(), "images");
    await mkdir(DATA_ROOT, { recursive: true });

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }
        const buffer = await response.arrayBuffer();
        const image = Buffer.from(buffer);
        const image_name = uuidv4();
        await writeFile(
            join(DATA_ROOT, `${image_name}.jpg`),
            image,
        );
        console.log("SAVED!");
    } catch {
        throw new Error();
    }
}
