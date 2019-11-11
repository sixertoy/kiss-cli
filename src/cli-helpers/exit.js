const { TIME_COLOR } = require('./../constants');
const { error } = require('./../core');

function exit(reason) {
  error(reason);
  // eslint-disable-next-line no-console
  console.timeEnd(TIME_COLOR);
  process.exit(1);
}

module.exports = exit;
