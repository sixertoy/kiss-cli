const describe = require('./describe');
const Utils = require('./program-utils');
const Package = require('./../package.json');
const Constants = require('./core/constants');

const WELCOME_MSG = `
Keep It Stupid Simple templated files generator
`;

/**
*
* CLI arguments parser
*
*/
const Program = {

  cmdargs: false,

  // Parse arguments from process
  parse: (files) => {
    const args = process.argv.slice(2);
    if (!args.length) {
      Utils.exit('Missing arguments', false);
    }
    return args;
  },

  // Show KISS cli version
  printversion: () => {
    const semver = Package.version;
    Utils.info(`Kiss v${semver}${Constants.NL}`);
    Utils.debug(WELCOME_MSG);
  },

  // Output template content and exit
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

  // Check if first argument is a file
  isfile: () => {
    let valid;
    try {
      valid = this.cmdargs.length;
      valid = valid && (typeof this.cmdargs[0] === 'string');
      valid = valid && (this.cmdargs[0].indexOf('.') !== -1);
      return valid;
    } catch (e) {
      // exit with an error and prompt help
      Utils.exit('Unknow template type');
    }
    return false;
  },

  // Check if first argument is a file
  isknowtype: files => Object.keys(files)
    .includes(this.cmdargs[0]),

  args: () =>
    [].concat(this.cmdargs),

};

module.exports = Program;
