const colors = require('./colors');
const fp = require('./fp');
const home = require('./home');
const logger = require('./logger');
const noop = require('./noop');

module.exports = {
  colors,
  home,
  noop,
  ...fp,
  ...logger,
};
