/* globals process, require */
(function () {

    'use strict';

    var program = require('commander'),
        // requires
        utils = require('./src/core/utils'),
        write = require('./src/file-writer'),
        print = require('./src/print-template'),
        getTemplates = require('./src/get-templates'),
        describe = require('./src/do-describe-types'),
        // variables
        valid = false,
        // cli version
        semver = false,
        // map object with types attached to a files
        templates = false,
        // file and type defined by cli arguments
        templateType = false,
        destinationFile = false,
        // list of available templates and types to show on kiss --help or kiss --debug
        templatesHelpList = '';

    semver = utils.semver();
    templates = getTemplates();
    templatesHelpList = describe(templates);

    // setup help and options
    program
        .version(semver)
        .option('-D, --debug', 'Show availables templates')
        .description(templatesHelpList)
        .usage('[path/to/output/file] [filetype]')
        .parse(process.argv);

    // options -D or --debug
    valid = program.debug;
    if (valid) {
        // if no arguments
        // show availables templates
        if (!program.args.length) {
            console.log(templatesHelpList);
            process.exit(0);
        }
        // if arguments and first arguments is a valid type
        // show content of a template type
        valid = program.args.length >= 1;
        valid = valid && templates.hasOwnProperty(program.args[0]);
        if (valid) {
            print(program.args[0], templates);
            process.exit(0);
        }
        // more than 1 arguments with command --debug or -D
        // will throw an error
        utils.log('Wrong arguments');
        process.exit(1);
    }

    // if no arguments
    valid = program.args.length >= 2;
    if (!valid) {
        utils.log('Missing arguments');
        process.exit(1);
    }

    templateType = program.args[1];
    destinationFile = program.args[0];

    valid = templates.hasOwnProperty(templateType);
    // if type is not a valid template type
    if (!valid) {
        utils.log('Invalid template file');
        process.exit(1);
    }

    // write output file with template content
    write(destinationFile, templateType, templates);

}());
