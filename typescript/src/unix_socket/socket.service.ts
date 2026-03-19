import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Socket } from "net";

const HEADER_SIZE = 4;

@Injectable()
export class SocketService {
    constructor(
        private configService: ConfigService,
    ) {}

    private client: Socket | null = null;

    async connect(): Promise<void> {
        const socketPath = this.configService.get<string>("SOCKET_PATH");
        
        if (!socketPath) {
            throw new Error("SOCKET_PATH is missing in .env file");
        }
        return new Promise((resolve, reject) => {
            const socket = new Socket();
            socket.on("connect", () => {
                console.log("[🔌 UnixSocket]\t📬 Ouverture socket");
                this.client = socket;
                resolve();
            });

            socket.on("close", () => {
                console.error("[🔌 UnixSocket]\t📪 Fermeture socket");
            });

            socket.on("error", (error) => {
                console.error("[🔌 UnixSocket]\t⚠️ Error:", error);
                reject(error.message);
            });

            socket.connect(socketPath);
        });
    }

    async send(payload: Buffer): Promise<Buffer> {
        await this.connect();
        return new Promise((resolve) => {
            this.client?.write(this.payloadWithHeader(payload, HEADER_SIZE));
            this.client?.once("data", (data) => {
                resolve(data);
                this.client?.destroy();
            });
        });
    }

    private payloadWithHeader(payload: Buffer, header_size: number): Buffer {
        const header = Buffer.alloc(header_size);
        header.writeUInt32BE(payload.length, 0);
        return Buffer.concat([header, payload]);
    }
}
