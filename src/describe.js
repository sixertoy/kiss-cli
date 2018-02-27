/* global require, module */
(function () {
  let colors = require('./core/colors'),
    utils = require('./program-utils'),
    consts = require('./core/constants');

    /**
     *
     * Write out available templates and their paths
     *
     */
  module.exports = function (types) {
    //
    let key,
      desc = 'Types:',
      home = utils.homeuser(),
      keys = Object.keys(types).sort();
    while (keys.length) {
      key = keys.shift();
      desc += consts.NEW_LINE + consts.TAB + key;
      key = types[key];
      if (key.indexOf(consts.CURRENT_WD) !== -1) {
        key = key.replace(consts.CURRENT_WD, consts.DOT);
      } else {
        key = key.replace(home, consts.TILDE);
      }
      desc += colors.green(consts.WHITESPACE + key);
    }
    desc += consts.NEW_LINE + consts.NEW_LINE;
    return desc;
  };
}());
