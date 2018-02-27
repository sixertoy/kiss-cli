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
 * kiss <path/to/outputfile> <type>
 *
 */
// require
// const write = require('./src/writer');
const program = require('./src/program');
const describe = require('./src/describe');
// const Utils = require('./src/program-utils');
const templates = require('./src/templates');

const USE_DEBUG = true;
const TIME_COLOR = '\u001b[32mSuccess\u001b[39m';
// eslint-disable-next-line no-console
const time = console.time(TIME_COLOR);

try {
  // show KISS version
  program.printversion();
  // retrieves KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  const files = templates();
  // validate arguments
  // if no arguments:
  // - exit with error
  // - show usages and templates
  const args = program.parse(files);

  // retrieve templates list in
  // 1/ kiss extension folder
  // 2/ user's home folder
  // 3/ current project folder
  // output help if -h or --help is used
  /*
  if (program.needhelp()) {
    utils.help(desc);
  }

  // if arguments.length === 1 and argument is a template
  // if is not a know template file will prompt content and exit
  program.print(files);
  // if arguments.length === 1 and is not a file
  // exit and prompt an error
  program.isfile();
  // if arguments.length > 1 and is a know type
  template = false;
  args = program.args();
  type = program.isknowtype(files);
  if (type) {
    args.shift();
    template = files[type];
  } else {
    template = files;
  }

  // write output file with tem
  write(args, template, () => {
  });
  */

  // eslint-disable-next-line no-console
  console.timeEnd(time);
  process.exit(0);
} catch (e) {
  if (USE_DEBUG) {
    process.stdout.write(`error >>> ${e}\n`);
  }
  if (process.stderr.isTTY) {
    const err = '\u001b[31m! Unexpected error has occurred\u001b[39m\n';
    process.stderr.write(err);
  }
  process.exit(1);
}
