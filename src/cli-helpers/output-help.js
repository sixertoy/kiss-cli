const { INDENT, NL } = require("../constants");
const { colors, log } = require("../core");

// ${Constants.INDENT}kiss <url>
// ${Constants.INDENT}kiss '<rgb_color>'
const USAGE = `
${colors.bold('Usage:')}
${INDENT}kiss <type> <./path/to/outputfile>
${INDENT}kiss <./path/to/outputfile.type>
${INDENT}kiss --list | -T       List availables templates
${INDENT}kiss <template_name>   Output template content in console
`;

function outputHelp() {
  log(USAGE);
  log(NL);
}

module.exports = outputHelp;
