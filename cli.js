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
 * Options:
 * --debug, -D Shows availables templates
 * -D <type> Shows content of a template
 *
 */
// log colored execution time
var timecolor = '\u001b[32mSuccess\u001b[39m';
console.time(timecolor);

(function (time) {

    'use strict';

    var program = require('commander'),
        // requires
        utils = require('./src/core/utils'),
        print = require('./src/print-template'),
        constants = require('./src/core/constants'),
        FileWriter = require('./src/output-writer'),
        getTemplates = require('./src/get-templates'),
        describe = require('./src/do-describe-types'),
        // debug timer

        // variables
        debug = false,
        valid = false,
        // cli version
        semver = false,
        // map object with types attached to a files
        type = false,
        templates = false,
        // file and type defined by cli arguments
        outputfiles = false,
        templatefile = false,
        // list of available templates and types to show on kiss --help or kiss --debug
        templatesTypesList = '';

    try {

        semver = utils.semver();
        utils.info('Kiss v' + semver + constants.NEW_LINE);

        templates = getTemplates();
        templatesTypesList = describe(templates);

        // setup help and options
        program
            .version(semver)
            .option('-D, --debug', 'Show availables templates')
            .description(templatesTypesList)
            .usage('[path/to/output/file] [filetype]')
            .parse(process.argv);

        // options -D or --debug
        debug = program.debug;

        // if no arguments
        if (debug && !program.args.length) {
            // show availables templates map (types/paths)
            templatesTypesList += '\n';
            utils.log(templatesTypesList);
            process.exit(0);
        }
        // if arguments and first arguments is a valid type
        valid = program.args.length === 1;
        valid = valid && templates.hasOwnProperty(program.args[0]);
        if (debug && valid) {
            // show content of a template type
            print(program.args[0], templates);
            process.exit(0);

        }

        // if arguments and first arguments is not a valid type
        valid = program.args.length === 1;
        valid = valid && !templates.hasOwnProperty(program.args[0]);
        if (debug && valid) {
            utils.error('Invalid template type');

        }

        // more than 1 arguments with command --debug or -D
        // will throw an error
        if (debug && program.args.length > 1) {
            utils.error('Too much arguments');
        }

        // if no arguments
        valid = program.args.length < 2;
        if (valid) {
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

    } catch (e) {
        process.exit(1);
    }

}(timecolor));
