const colors = require('./colors');
const fp = require('./fp');
const home = require('./home');
const isfile = require('./isfile');
const isknowtype = require('./isknowtype');
const logger = require('./logger');
const noop = require('./noop');

module.exports = {
  colors,
  home,
  isfile,
  isknowtype,
  noop,
  ...fp,
  ...logger,
};
