const fs = require('fs');
const { help } = require('./program');
const isfile = require('./kiss/isfile');
const Colors = require('./core/colors');
const { write } = require('./kiss/writer');
const Constants = require('./core/constants');
const templates = require('./kiss/templates');
const isknowtype = require('./kiss/isknowtype');

const printTypes = types => `
${Colors.bold('Available Templates:')}
${Object.keys(types).map(key => `\
${Constants.INDENT}${Colors.green(key)}: ${Colors.grey(types[key])}
`).join('')}
`;

const printTemplate = (filetype, types) => `
${Colors.bold('Template content:')}
${Colors.green(types[filetype])}
${Colors.grey(fs.readFileSync(types[filetype], 'utf8'))}\
`;

module.exports = (args) => {
  // retrieve KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  const files = templates();

  // Check if first argument is a know type
  const validtype = isknowtype(args, files);

  // Check if second argument is a file
  const validfile = isfile(args);

  // Output available templates
  if (!validtype) help(printTypes(files), 'Invalid type');
  // Output template content and exit
  if (validtype && !validfile) help(printTemplate(args[0], files));
  // Write templates
  if (validtype && validfile) write();
  return args;
};
