import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export async function fetchAndSave(url: string, name: string): Promise<string> {
    const DATA_ROOT = join(process.cwd(), "images");
    await mkdir(DATA_ROOT, { recursive: true });

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }
        const buffer = await response.arrayBuffer();
        const image = Buffer.from(buffer);
        await writeFile(
            join(DATA_ROOT, name),
            image,
        );
        return name;
    } catch {
        throw new Error();
    }
}
