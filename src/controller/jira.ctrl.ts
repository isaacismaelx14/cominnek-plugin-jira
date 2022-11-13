import { AuthController, IAuth } from './auth.ctrl';
import JiraApi from 'jira-client';
import clc from 'cli-color';

export class JiraController {
    private authCtrl: AuthController;

    constructor() {
        this.authCtrl = new AuthController();
    }

    async getIssues(): Promise<any> {
        const { jira, token } = this.getJira();
        const { url } = token;

        jira.getUsersIssues(token.username, true).then((context) => {
            context.issues.forEach((element: any) => {
                const { key } = element;
                console.log("-", clc.green(key), `https://${url}/${key}`);
            });
        });
    }

    private getJira(): { jira: JiraApi, token: IAuth } {
        const token = this.authCtrl.getToken();

        if (!token) {
            console.log(clc.bgRedBright(" Error! ") + " Please login to Jira.");
            process.exit(1);
        }

        const jira = new JiraApi({
            protocol: "https",
            host: token.url,
            username: token.username,
            password: token.token,
            apiVersion: "2",
        });

        return {
            jira,
            token
        }
    }
}
