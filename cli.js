/*
 *  __  __   __   ______   ______
 * /\ \/ /  /\ \ /\  ___\ /\  ___\
 * \ \  _"-.\ \ \\ \___  \\ \___  \
 * \ \_\ \_\\ \_\\/\_____\\/\_____\
 *  \/_/\/_/ \/_/ \/_____/ \/_____/
 *
 * The return of ASCII ugly art
 *
 * @author Matthieu Lassalvy
 * @email sixertoy.github gmail
 * @repository https://github.com/sixertoy/kiss-cli
 *
 * Install:
 * npm i -g kiss-cli
 *
 * Usage:
 * kiss <type> <path/to/outputfile>
 *
 */
const kiss = require('./src/kiss');
const { error } = require('./src/core/logger');
const { args, version } = require('./src/program');

const USE_DEBUG = true;

try {
  const commandArguments = args();
  version();
  kiss(commandArguments);
} catch (e) {
  if (USE_DEBUG) {
    error(`error >>> ${e}\n`);
  }
  if (process.stderr.isTTY) {
    error('\u001b[31m! Unexpected error has occurred\u001b[39m\n');
  }
  process.exit(1);
}
