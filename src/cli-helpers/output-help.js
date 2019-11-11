const { OPTIONS } = require('./../constants');
const { log } = require('./../core');

function outputHelp() {
  log(OPTIONS);
}

module.exports = outputHelp;
