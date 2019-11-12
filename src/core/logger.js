const colors = require('./colors');

module.exports = {
  // Show a gray colored message
  debug: msg => {
    if (!process.stdout.isTTY) return;
    process.stdout.write(colors.gray(msg));
  },

  // Show a red clored message
  // @param {Boolean} throwerror - wheter throw an error catchable by cli
  error: msg => {
    const input = `\n${colors.red(`Error: ${msg}`)}`;
    if (process.stderr.isTTY) process.stderr.write(input);
    return false;
  },

  // Show a magenta colored message
  info: msg => {
    if (!process.stdout.isTTY) return;
    const value = colors.magenta(msg);
    process.stdout.write(value);
  },

  // Log a message in console
  log: msg => {
    if (!process.stdout.isTTY) return;
    process.stdout.write(msg);
  },

  // Show a green colored mesage
  ok: msg => {
    if (!process.stdout.isTTY) return;
    process.stdout.write(colors.green(msg));
  },

  output: msg => {
    if (!process.stdout.isTTY) return;
    process.stdout.write(msg);
  },

  warning: msg => {
    const input = `${colors.yellow(`Warning: ${msg}`)}`;
    if (process.stderr.isTTY) process.stderr.write(input);
    return false;
  },
};
