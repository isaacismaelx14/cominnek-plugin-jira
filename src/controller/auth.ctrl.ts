import clc from "cli-color";
import mainConfig from "../config/main.config";
import { eventEmitter } from "../events/main.event";
import { startServer } from "../server/auth.server";
import { FileController } from './files.ctrl';
import { CryptoController } from './crypto.ctrl';

export class AuthController {
    private fileCtrl: FileController;
    private cryptoCtrl: CryptoController;

    constructor() {
        this.fileCtrl = new FileController();
        this.cryptoCtrl = new CryptoController();
    }

    login(): void {
        console.log(`Please ${clc.blue("authenticate")} with Jira at:`);
        console.log(mainConfig.JIRA_AUTH_URL);

        eventEmitter.on("auth", (code) => {
            this.saveToken(code);
            console.log("");
            console.log(clc.bgGreenBright(" Success! ") + " Logged in to Jira.");
            process.exit(0);
        });

        startServer();
    }

    logout(): void {
        this.fileCtrl.delete(mainConfig.TOKEN_FILE);
        console.log(clc.bgGreenBright(" Success! ") + " Logged out of Jira.");
        process.exit(0);
    }

    private saveToken(token: string): void {
        const encryptedToken = this.cryptoCtrl.encrypt(token);
        const parsedToken = JSON.stringify(encryptedToken);

        this.fileCtrl.write(mainConfig.TOKEN_FILE, parsedToken);
    }
}
