const COLORS = {
  RED: 31,
  GREEN: 32,
  YELLOW: 33,
  BLUE: 34,
  MAGENTA: 35,
  CYAN: 36,
  WHITE: 37,
  GRAY: 90,
};


function getColor(msg, code) {
  return `\u001b[${code}m${msg}\u001b[39m`;
}

module.exports = {
  red: msg =>
    getColor(msg, COLORS.RED),
  gray: msg =>
    getColor(msg, COLORS.GRAY),
  // alias of gray
  grey: msg =>
    getColor(msg, COLORS.GRAY),
  blue: msg =>
    getColor(msg, COLORS.BLUE),
  cyan: msg =>
    getColor(msg, COLORS.CYAN),
  green: msg =>
    getColor(msg, COLORS.GREEN),
  white: msg =>
    getColor(msg, COLORS.WHITE),
  yellow: msg =>
    getColor(msg, COLORS.YELLOW),
  magenta: msg =>
    getColor(msg, COLORS.MAGENTA),
};
