/* global module */
(function () {
  var colors = {

    RED: 31,
    GREEN: 32,
    YELLOW: 33,
    BLUE: 34,
    MAGENTA: 35,
    CYAN: 36,
    WHITE: 37,
    GRAY: 90,

    __getColor(msg, code) {
      return `\u001b[${code}m${msg}\u001b[39m`;
    },
    red(msg) {
      return colors.__getColor(msg, colors.RED);
    },
    gray(msg) {
      return colors.__getColor(msg, colors.GRAY);
    },
    grey(msg) {
      // alias of gray
      return this.gray(msg);
    },
    blue(msg) {
      return colors.__getColor(msg, colors.BLUE);
    },
    cyan(msg) {
      return colors.__getColor(msg, colors.CYAN);
    },
    green(msg) {
      return colors.__getColor(msg, colors.GREEN);
    },
    white(msg) {
      return colors.__getColor(msg, colors.WHITE);
    },
    yellow(msg) {
      return colors.__getColor(msg, colors.YELLOW);
    },
    magenta(msg) {
      return colors.__getColor(msg, colors.MAGENTA);
    },
  };

  module.exports = colors;
}());
