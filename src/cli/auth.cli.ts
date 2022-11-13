import { AuthController } from '../controller/auth.ctrl';
import { Command } from 'commander';

const authCtrl = new AuthController();

export default (program: Command) => {
    const auth = program
        .command("auth")
        .description("Authenticate with Jira")
        .option("-u, --username <string>", "Jira username")
        .action((options) => {
            console.log("auth", options.username);
        });

    auth.command("login").description("Login to Jira").action(() => {
        authCtrl.login();
    });
}