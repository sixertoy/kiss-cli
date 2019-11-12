const colors = require('./colors');
const fp = require('./fp');
const home = require('./home');
const checkIsFile = require('./check-is-file');
const isKnowType = require('./is-know-type');
const logger = require('./logger');
const noop = require('./noop');

module.exports = {
  colors,
  home,
  checkIsFile,
  isKnowType,
  noop,
  ...fp,
  ...logger,
};
