const path = require('path');

const { colors } = require('./core');
const { description, homepage } = require('./../package.json');

const WS = ' ';
const NL = '\n';
const DOT = '.';
const TAB = '\t';
const TILDE = '~';
const INDENT = `${WS}${WS}`;
const KISS_DIRNAME = '.kiss';
const CURRENT_WD = process.cwd();
const KISS_ROOTPATH = path.join(__dirname, '..');

const TIME_COLOR = 'takes';

const VISIT = `
Kiss Homepage: ${homepage}
`;

// ${Constants.INDENT}kiss <url>
// ${Constants.INDENT}kiss '<rgb_color>'
const USAGE = `
${colors.bold('Usage:')}
${INDENT}kiss <type> <./relative/path/to/my.file> [...<r/p/t/my2.file>]
${INDENT}kiss <r/p/t/myfile.type> [...<r/p/t/myfile2.type>]
`;

const OPTIONS = `
${colors.bold('Options:')}
${INDENT}kiss --help            Display full usage info
${INDENT}kiss --list            List availables templates
${INDENT}kiss --print <name>    Output template content in console
`;

const WELCOME_MSG = `
${description}
`;

module.exports = {
  CURRENT_WD,
  DOT,
  INDENT,
  KISS_DIRNAME,
  KISS_ROOTPATH,
  NL,
  OPTIONS,
  TAB,
  TILDE,
  TIME_COLOR,
  USAGE,
  VISIT,
  WELCOME_MSG,
  WS,
};
