/* eslint no-process-env: 0 */
/* global require, module, process */
const fs = require('fs');
const colors = require('./core/colors');
const Constants = require('./core/constants');

const USAGE = `
Usage:
${Constants.INDENT}kiss <options>
${Constants.INDENT}kiss <type>
${Constants.INDENT}kiss <filename.type> [...]
${Constants.INDENT}kiss <type> <relative/filename> [...]

please visit: https://github.com/sixertoy/kiss-cli
`;

/**
*
* Stop process if an error
* Show a message & Log program help
*
*/
const Utils = {

  semverv: false,
  homeUser: false,

  help: (desc) => {
    Utils.log(USAGE);
    Utils.log(desc);
    process.exit(0);
  },

  exit: (reason, trow) => {
    Utils.log(USAGE);
    Utils.error(reason, trow);
    process.exit(1);
  },

  /**
  *
  * Print template's content to console
  *
  * @param {String} filetype
  * @param {Object} types
  *
  */
  print: (filetype, types) => {
    let input = null;
    let output = null;
    try {
      // get template filename
      input = types[filetype];

      output = Constants.NL;
      output += 'Template content:';
      Utils.log(output);
      output = Constants.NL + input;
      Utils.success(output);
      // get template content
      output = Constants.NL;
      output += fs.readFileSync(input, 'utf8');
      output += Constants.NL;
      // output file content to console
      Utils.debug(output);
    } catch (e) {
      Utils.exit('Unable to print template');
    }
  },

  /**
  *
  * Show a magenta colored message
  *
  */
  info: (msg) => {
    if (!process.stdout.isTTY) return;
    const value = colors.magenta(msg);
    process.stdout.write(value);
  },

  /**
  *
  * Log a message in console
  *
  */
  log: (msg) => {
    if (!process.stdout.isTTY) return;
    process.stdout.write(msg);
  },

  /**
  *
  * Show a green colored mesage
  *
  */
  success: (msg) => {
    if (!process.stdout.isTTY) return;
    process.stdout.write(colors.green(msg));
  },

  /**
  *
  * Show a gray colored message
  *
  */
  debug: (msg) => {
    if (process.stdout.isTTY) return;
    process.stdout.write(colors.gray(msg));
  },

  /**
  *
  * Show a red clored message
  *
  * @param {String} msg
  * @param {Boolean} throwerror - wether throw an error catcheble by cli
  *
  */
  error: (msg, throwerror) => {
    let value = null;
    let thrw = throwerror;
    if (arguments.length < 2) {
      thrw = true;
    }
    if (process.stderr.isTTY) {
      value = colors.red('Error: ');
      value += colors.red(msg + Constants.NL);
      process.stderr.write(value);
    }
    if (thrw) {
      throw new Error(msg);
    }
  },

  homeuser: () => {
    if (!this.homeUser) {
      const { HOME, USERPROFILE } = process.env;
      this.homeUser = HOME || USERPROFILE;
    }
    return this.homeUser;
  },

};

module.exports = Utils;
