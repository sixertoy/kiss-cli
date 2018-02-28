const colors = require('./colors');

module.exports = {
  colors,
  // Show a magenta colored message
  info: (msg) => {
    if (!process.stdout.isTTY) return;
    const value = colors.magenta(msg);
    process.stdout.write(value);
  },

  // Log a message in console
  log: (msg) => {
    if (!process.stdout.isTTY) return;
    process.stdout.write(msg);
  },

  // Show a green colored mesage
  success: (msg) => {
    if (!process.stdout.isTTY) return;
    process.stdout.write(colors.green(msg));
  },

  // Show a gray colored message
  debug: (msg) => {
    if (!process.stdout.isTTY) return;
    process.stdout.write(colors.gray(msg));
  },
  // Show a red clored message
  // @param {Boolean} throwerror - wheter throw an error catchable by cli
  error: (msg) => {
    if (!process.stderr.isTTY) return;
    process.stderr.write(`\n${colors.red(`Error: ${msg}`)}`);
  },
};
