import { Injectable } from "@nestjs/common";
import * as net from "net";
import { EventEmitter } from "events";

const SOCKET_PATH = "/home/victor/nest_rust.sock";

@Injectable()
export class SocketService {
    private readonly emitter = new EventEmitter();
    private readonly client = new net.Socket();

    async onModuleInit() {
        await this.connect(SOCKET_PATH);
    }

    async send(payload: Buffer) {
        await this.client.write(payload);
        await this.client.on(
            "data",
            (buffer) => console.log("Retour: ", buffer.toString()),
        );
    }

    async connect(socket_path: string) {
        this.client.connect(socket_path);
        this.client.on(
            "connect",
            () => console.log("[🔌 UnixSocket]\t🚀 Connexion réussie"),
        );
        this.client.on("close", () => {
            console.error("[🔌 UnixSocket]\t⚠️ Socket close");
        });
        this.client.on("error", (error) => {
            console.error("[🔌 UnixSocket]\t⚠️ Error:", error);
        });
    }
}
