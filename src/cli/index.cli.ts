import { Command } from "commander";
import authCli from "./auth.cli";
import jiraCli from "./jira.cli";

const program = new Command();

program.name("jira").version("0.0.1");
authCli(program);
jiraCli(program);

export default function init() {
    program.parse();
}
