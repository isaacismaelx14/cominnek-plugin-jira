import crypto from "crypto";
import privateConfig from "../config/private.config";

interface ICriptedData {
    iv: string;
    content: string;
}

export class CryptoController {
    private algorithm: string;
    private secret: string;

    constructor() {
        this.algorithm = privateConfig.ALGORITHM;
        this.secret = privateConfig.SECRET;
    }

    encrypt(text: string): ICriptedData {
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(this.algorithm, this.secret, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return {
            iv: iv.toString("hex"),
            content: encrypted.toString("hex"),
        };
    }

    decrypt(hash: ICriptedData): string {
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.secret,
            Buffer.from(hash.iv, "hex")
        );
        const decrpyted = Buffer.concat([
            decipher.update(Buffer.from(hash.content, "hex")),
            decipher.final(),
        ]);

        return decrpyted.toString();
    }
}
