import { AuthController } from "../controller/auth.ctrl";
import { Command } from "commander";

const authCtrl = new AuthController();

export default (program: Command) => {
    const auth = program
        .command("auth")
        .description("Authenticate with Jira")
        .action((options) => {
            console.log("auth");
        });

    auth
        .command("login")
        .description("Login to Jira")
        .option("--email <string>", "")
        .option("--token <string>", "")
        .option("--url <string>", "")
        .action((option) => {

            const { email, token, url } = option;
            const validateUndefiner = !email || !token || !url;
            const err = () => console.log("Please provide emain, token and URL");
            
            if (validateUndefiner) {
                err();
                process.exit(1);
            }
            
            const validateNull = !email.trim() || !token.trim() || !url.trim();
            if (validateNull) {
                err();
                process.exit(1);
            }

            authCtrl.login(email, token, url);
        });

    auth.command("logout").action(() => {
        authCtrl.logout();
    });
};
