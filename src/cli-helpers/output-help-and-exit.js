const exit = require('./exit');
const { INDENT, NL } = require('./../constants');
const { colors, log } = require('./../core');

// ${Constants.INDENT}kiss <url>
// ${Constants.INDENT}kiss '<rgb_color>'
const USAGE = `
${colors.bold('Usage:')}
${INDENT}kiss <type> <./relative/path/to/file>
${INDENT}kiss <./relative/path/to/file.type>
`;

const OPTIONS = `
${colors.bold('Options:')}
${INDENT}kiss --help            Display full usage info
${INDENT}kiss --list            List availables templates
${INDENT}kiss --print <name>    Output template content in console
`;

function outputHelpAndExit() {
  log(USAGE);
  log(OPTIONS);
  log(NL);
  exit();
}

module.exports = outputHelpAndExit;
