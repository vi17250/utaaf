import { mkdir, writeFile } from "fs/promises";
import { join } from "path";


export async function FetchAndSave(url: string): Promise<void> {
    const DATA_ROOT = join(process.cwd(), "images");
    await mkdir(DATA_ROOT, { recursive: true });

    try {
        // TODO: throw errors and log it explicitely server side
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }
        const buffer = await response.arrayBuffer();
        const image = Buffer.from(buffer);
        await writeFile(
            // TODO: dirname must be correctely define
            join(DATA_ROOT, "name.jpg"),
            image,
        );
        console.log("SAVED!");
    } catch {
        throw new Error();
    }
}
