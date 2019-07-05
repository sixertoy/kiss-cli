const exit = require('./exit');

function args() {
  const argsv = process.argv.slice(2);
  if (!argsv.length) exit('Missing arguments', false);
  return argsv;
}

module.exports = args;
