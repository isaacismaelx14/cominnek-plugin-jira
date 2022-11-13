import { Command } from "commander";
import authCli from "./auth.cli";

const program = new Command();

program.name("jira").version("0.0.1");
authCli(program);

export default function init() {
    program.parse();
}
