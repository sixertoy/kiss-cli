const fs = require('fs');
const path = require('path');
const { help } = require('./program');
const Colors = require('./core/colors');
const Constants = require('./core/constants');
const templates = require('./kiss/templates');

/*
const print = (types) => Object
  .keys(types).sort()
  .reduce((acc, key) => `${acc}
  ${key}${types[key]}`, 'Types:');
  */

/*
print: (files) => {
  let keys = Object.keys(files),
  valid = this.cmdargs.length < 2;
  valid = valid && keys.indexOf(this.cmdargs[0]) !== -1;
  if (valid) {
    // show content of a template type
    Utils.print(this.cmdargs.shift(), files);
    process.exit(0);
  }
},
*/
const describe = types => `
${Colors.bold('Available Templates:')}
${Object.keys(types).map(key => `\
${Constants.INDENT}${Colors.green(key)}: ${Colors.grey(types[key])}
`).join('')}
`;

const print = (filetype, types) => `
${Colors.bold('Template content:')}
${Colors.green(types[filetype])}
${Colors.grey(fs.readFileSync(types[filetype], 'utf8'))}\
`;

module.exports = (args) => {
  // retrieve KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  const files = templates();

  // Check if first argument is a know type
  const isknowtype = args
    && args.length > 0 && args[0]
    && Object.keys(files).indexOf(args[0]) !== -1;

  // Check if second argument is a file
  const isfile = args
    && args.length > 1 && args[1]
    && (typeof args[1] === 'string') && (args[1].indexOf(path.sep) !== -1)
    && args[1].lastIndexOf('.') >= (args[1].length - 4); // .js, .css, .scss, .html...

  // Output available templates
  if (!isknowtype) help(describe(files), 'Invalid type');
  // Output template content and exit
  if (isknowtype && !isfile) help(print(args[0], files));
  // Write templates
  return args;
};
