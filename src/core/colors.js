const COLORS = {
  BLUE: 34,
  CYAN: 36,
  GRAY: 90,
  GREEN: 32,
  MAGENTA: 35,
  RED: 31,
  WHITE: 37,
  YELLOW: 33,
};

const getColor = (msg, code) => `\u001b[${code}m${msg}\u001b[39m`;

const colors = {
  blue: msg => getColor(msg, COLORS.BLUE),
  bold: msg => `\u001b[0;1m${msg}\u001b[0;0m`,
  cyan: msg => getColor(msg, COLORS.CYAN),
  // alias of gray
  gray: msg => getColor(msg, COLORS.GRAY),
  green: msg => getColor(msg, COLORS.GREEN),
  grey: msg => getColor(msg, COLORS.GRAY),
  magenta: msg => getColor(msg, COLORS.MAGENTA),
  red: msg => getColor(msg, COLORS.RED),
  white: msg => getColor(msg, COLORS.WHITE),
  yellow: msg => getColor(msg, COLORS.YELLOW),
};

module.exports = colors;
