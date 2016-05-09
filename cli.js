// jshint maxstatements: 40
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

    var utils = require('./src/core/utils'),
        program = require('./src/core/argm'),

        constants = require('./src/core/constants'),
        FileWriter = require('./src/output-writer'),

        templates = require('./src/get-templates'),
        describe = require('./src/do-describe-types'),

        // variables
        files, description;

    try {
        // validate arguments
        // exit with error if no arguments
        program.parse();

        // show version if options -V or --version is used
        if (program.needversion()) {
            utils.version();
            process.exit(0);
        }

        // retrieve templates list in
        // 1/ kiss extension folder
        // 2/ user's home folder
        // 3/ current project folder
        files = templates();

        // output help if -h or --help is used
        if (program.needhelp()) {
            // log version, description and exit
            description = describe(templates);
            utils.describe(description);
            process.exit(0);
        }

        /*

        // setup help and options
        program
            .version(semver)
            .description(templatesTypesList)
            .usage('[path/to/output/file] [filetype]')
            .parse(process.argv);

        validation
            .setProgram(program)
            .setTemplates(templates);

        // if no arguments
        // exit with error
        validation.hasArguments();

        // if arguments length equal 1
        // and value at index 0 is a available template type
        // will show content of this template
        validation.printTemplate(program, templates);
        */

        // if no arguments
        // will show output with an error message
        /*
        valid = program.args.length === 1;
        valid = valid && !templates.hasOwnProperty(program.args[0]);
        if (valid) {
            program.outputHelp();
            utils.error('Missing arguments');
        }

        // do not reorder
        type = program.args.pop();
        outputfiles = program.args;

        valid = templates.hasOwnProperty(type);
        // if type is not a valid template type
        if (!valid) {
            utils.error('Invalid template type');
        }

        // write output file with template content
        templatefile = templates[type];
        FileWriter.write(outputfiles, templatefile, function () {
            console.timeEnd(time);
            process.exit(0);
        });
        */
        console.timeEnd(time);
        process.exit(0);

    } catch (e) {
        console.log('error >>> ', e);
        process.exit(1);
    }

}(timecolor));
