import path from 'path'
import getAppDataPath from 'appdata-path'

const cominnekDir = path.join(getAppDataPath(), '.cominnek')

export default {
  TOKEN_FILE: path.join(cominnekDir, 'plugins', 'jira', 'token.json'),
};
