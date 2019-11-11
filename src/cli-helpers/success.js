const { TIME_COLOR } = require('./../constants');
const { ok } = require('./../core');

function success(msg) {
  if (msg) ok(`${msg}\n`);
  // eslint-disable-next-line no-console
  console.timeEnd(TIME_COLOR);
  process.exit(0);
}

module.exports = success;
