import { Injectable } from "@nestjs/common";
import { Socket } from "net";

const SOCKET_PATH = "/home/victor/nest_rust.sock";
const HEADER_SIZE = 4;

@Injectable()
export class SocketService {
    private readonly client = new Socket();

    constructor() {
        this.client.on("connect", () => {
            console.log("[🔌 UnixSocket]\t📬 Ouverture socket");
        });

        this.client.on("close", () => {
            console.error("[🔌 UnixSocket]\t📪 Fermeture socket");
        });

        this.client.on("error", (error) => {
            console.error("[🔌 UnixSocket]\t⚠️ Error:", error);
        });
    }

    async connect(socketPath: string = SOCKET_PATH) {
        this.client.connect(socketPath);
    }

    async send(payload: Buffer): Promise<string> {
        return new Promise((resolve) => {
            this.connect();
            this.client.write(this.payloadWithHeader(payload));
            this.client.once("data", (data) => {
                resolve(data.toString())
            });
        });
    }

    private payloadWithHeader(payload: Buffer): Buffer {
        const header = Buffer.alloc(HEADER_SIZE);
        header.writeUInt32BE(payload.length, 0);
        return Buffer.concat([header, payload]);
    }
}
