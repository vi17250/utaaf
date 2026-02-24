import { Injectable } from "@nestjs/common";
import { Socket } from "net";

const SOCKET_PATH = "/home/victor/nest_rust.sock";
const HEADER_SIZE = 4;

/**
 * Service dédié à la communication avec un autre serveur via une socket unix
 *
 * @class SocketService
 */
@Injectable()
export class SocketService {
    private client: Socket | null = null;


    /**
     * Connecte le service à la socket
     *
     * @param socketPath le chemin de la socket
     * @returns `Promise<void>` une promesse résolue lorsque que la connexion a été établie
     */
    async connect(socketPath: string): Promise<void> {
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

    /**
     * Envoie le message passé en paramètre et retourne la réponse
     * La socket est fermée après réception
     *
     * @param payload l'élément à envoyer via la socket
     * @returns `Promise<Buffer>`une promesse résolue lorsque le serveur de socket retourne des informations
     */
    async send(payload: Buffer): Promise<Buffer> {
        await this.connect(SOCKET_PATH);
        return new Promise((resolve) => {
            this.client?.write(this.payloadWithHeader(payload, HEADER_SIZE));
            this.client?.once("data", (data) => {
                resolve(data);
                this.client?.destroy()
            });
        });
    }

    /**
     * Calcule la taille du payload passé en paramètre et retoure la concaténation des deux
     *
     * @param payload le buffer de données
     * @param header_size la taille en octets du header
     * @returns un buffer contenant le header et le payload initial
     */
    private payloadWithHeader(payload: Buffer, header_size: number): Buffer {
        const header = Buffer.alloc(header_size);
        header.writeUInt32BE(payload.length, 0);
        return Buffer.concat([header, payload]);
    }
}
