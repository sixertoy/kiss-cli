const path = require('path');

const { colors } = require('./core');
const { description, homepage } = require('./../package.json');

const INDENT = '  ';

const VISIT = `
please visit: ${homepage}
`;

// ${Constants.INDENT}kiss <url>
// ${Constants.INDENT}kiss '<rgb_color>'
const USAGE = `
${colors.bold('Usage:')}
${INDENT}kiss <type> <./relative/path/to/my.file> [...<r/p/t/my2.file>]
${INDENT}kiss <r/p/t/myfile.type> [...<r/p/t/myfile2.type>]
`;

const WELCOME_MSG = `
${description}
`;

const TIME_COLOR = 'takes';

const KISS_DIRNAME = '.kiss';

const KISS_ROOTPATH = path.join(__dirname, '..');

module.exports = {
  CURRENT_WD: process.cwd(), // Template directory name
  DOT: '.',
  INDENT,
  KISS_DIRNAME,
  KISS_ROOTPATH,
  NL: '\n', // unix end line
  TAB: '\t',
  TILDE: '~',
  TIME_COLOR,
  USAGE,
  VISIT,
  WELCOME_MSG,
  WHITESPACE: ' ',
};
