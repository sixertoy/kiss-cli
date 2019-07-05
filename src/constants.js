const { colors } = require('./core/logger');
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

module.exports = {
  CURRENT_WD: process.cwd(), // Template directory name
  DOT: '.',
  INDENT,
  NL: '\n', // unix end line
  TAB: '\t',
  TILDE: '~',
  TIME_COLOR,
  USAGE,
  VISIT,
  WELCOME_MSG,
  WHITESPACE: ' ',
};
