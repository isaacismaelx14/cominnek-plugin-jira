import { Command } from 'commander';
import { JiraController } from '../controller/jira.ctrl';

const jiraCtrl = new JiraController();

export default (program: Command) => { 
    program
        .command('issues')
        .description('Jira CLI')
        .action(() => {
            console.log("getting issues");            
            jiraCtrl.getIssues();
        });
}