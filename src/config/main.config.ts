import os from 'os'
import path from 'path'
import getAppDataPath from 'appdata-path'

const cominnekDir = path.join(getAppDataPath(), '.cominnek')
 console.log(cominnekDir)
export default {
  PORT: 4399,
  TOKEN_FILE: path.join(cominnekDir, 'plugins', 'jira', 'token.json'),
  JIRA_AUTH_URL:
    "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=9NDmdsr9Uzv40fi9IhUtG1gyfwnxXbqT&scope=read%3Ajira-work%20manage%3Ajira-project%20read%3Ajira-user%20write%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A4399%2Fauth%2F&response_type=code&prompt=consentn",
};
