import clc from "cli-color";
import mainConfig from "../config/main.config";
import { FileController } from './files.ctrl';
import { CryptoController } from './crypto.ctrl';

export interface IAuth {
    username: string;
    token: string;
    url: string;
}

export class AuthController {
    private fileCtrl: FileController;
    private cryptoCtrl: CryptoController;

    constructor() {
        this.fileCtrl = new FileController();
        this.cryptoCtrl = new CryptoController();
    }

    login(email: string, token: string, url: string): void {
        this.saveToken({
            username: email,
            token,
            url
        });

        console.log(clc.bgGreenBright(" Success! ") + " Logged in successfully.");
    }

    logout(): void {
        this.fileCtrl.delete(mainConfig.TOKEN_FILE);
        console.log(clc.bgGreenBright(" Success! ") + " Logged out of Jira.");
        process.exit(0);
    }

    private saveToken(auth: IAuth): void {
        const encryptedToken = this.cryptoCtrl.encrypt(JSON.stringify(auth));
        const parsedToken = JSON.stringify(encryptedToken);

        this.fileCtrl.write(mainConfig.TOKEN_FILE, parsedToken);
    }

    public getToken(): IAuth | undefined {
        const file = mainConfig.TOKEN_FILE;
        if (!this.fileCtrl.exist(file)) return;

        const token = this.fileCtrl.read(file);
        const parsedToken = JSON.parse(token);
        const decryptedToken = this.cryptoCtrl.decrypt(parsedToken);

        return JSON.parse(decryptedToken);
    }
}
