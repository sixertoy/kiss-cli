/*jslint indent: 4, nomen: true */
/*globals process, require, __dirname */

(function () {

    'use strict';

    var semver = '0.1.31',
        keys, extension, output, input, rstream, wstream,
        description = '',
        cwd = process.cwd(),
        // requires
        path = require('path'),
        chalk = require('chalk'),
        fse = require('fs-extra'),
        program = require('commander'),
        deepAssign = require('deep-assign'),
        allowedTypes = require('./../kiss.json');

    /**
     *
     * Write File
     *
     */
    function kissOut(file, filetype) {
        try {
            extension = path.basename(allowedTypes[filetype], '.tpl').split('.').slice(1).join('.');
            input = path.join(__dirname, '..', allowedTypes[filetype]);
            rstream = fse.createReadStream(input);
            output = path.join(cwd, (file + '.' + extension));
            fse.ensureFileSync(output);
            wstream = fse.createWriteStream(output);
            rstream.on('end', function () {
                process.exit(0);
            });
            rstream.pipe(wstream);
            //
        } catch (e) {
            process.stderr.write(chalk.bold.red('Error: ') + chalk.red('aborted with error\n'));
            program.outputHelp();
            process.exit(1);
        }
    }

    keys = Object.keys(allowedTypes);
    description += 'Filetypes:\n';
    keys.forEach(function (n) {
        description += '\t' + n + '\n';
    });

    program
        .version(semver)
        .usage('[path/to/output/file] [filetype]')
        .description(description)
        .parse(process.argv);

    // if no args will output an error
    if (program.args.length < 1) {
        // error
        process.stderr.write(chalk.bold.red('Error: ') + chalk.red('missing arguments\n'));
        program.outputHelp();
        process.exit(1);
    }

    // si le file type n'est pas present
    // prompt inquirer
    /*
    if(program.args.length < 2){

    }
    */

    if (Object.keys(allowedTypes).indexOf(program.args[1]) < 0) {
        // error
        process.stderr.write(chalk.bold.red('Error: ') + chalk.red('invalid file type'));
        program.outputHelp();
        process.exit(1);
    }

    kissOut(program.args[0], program.args[1]);

}());
