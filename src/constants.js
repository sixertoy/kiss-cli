const path = require('path');

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

module.exports = {
  CURRENT_WD,
  DOT,
  INDENT,
  KISS_DIRNAME,
  KISS_ROOTPATH,
  NL,
  TAB,
  TILDE,
  TIME_COLOR,
  WS,
};
