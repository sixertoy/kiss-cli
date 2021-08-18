const { TIME_COLOR, WS } = require("../constants");
const { error, ok } = require("../core");

function exit(reason) {
  const hasReason = Boolean(reason);
  if (hasReason) error(`${reason}${WS}`);
  else ok(`Success${WS}`);
  // eslint-disable-next-line no-console
  console.timeEnd(TIME_COLOR);
  process.exit(hasReason);
}

module.exports = exit;
