// jshint maxstatements: 40
/* eslint no-console: 0 */
/* globals process, require */
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
// log colored execution time
var timecolor = '\u001b[32mSuccess\u001b[39m';
console.time(timecolor);

(function (time) {

    'use strict';

    var USE_DEBUG = false,
        files, desc, template, type, args,
        // require
        write = require('./src/writer'),
        program = require('./src/program'),
        describe = require('./src/describe'),
        utils = require('./src/program-utils'),
        templates = require('./src/templates');

    try {
        // validate arguments
        // exit with error if no arguments
        program.parse();
        // show version if options -V or --version is used
        program.needversion();

        // retrieve templates list in
        // 1/ kiss extension folder
        // 2/ user's home folder
        // 3/ current project folder
        files = templates();
        // output help if -h or --help is used
        if (program.needhelp()) {
            desc = describe(files);
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
        write(args, template, function () {
            console.timeEnd(time);
            process.exit(0);
        });

    } catch (e) {
        if (USE_DEBUG) {
            console.log('error >>> ', e);
        }
        process.exit(1);
    }

}(timecolor));
