/*jslint indent: 4, nomen: true */
/*globals process, require, __dirname */

(function () {

    'use strict';

    var semver = '0.1.31',
        keys,
        ext,
        yofile,
        heyfile,
        rstream,
        wstream,
        description = '',
        cwd = process.cwd(),
        allowedTypes = {
            angular: '_angular.js.tpl',
            grunt: '_gruntfile.js.tpl',
            gulp: '_gulpfile.js.tpl',
            html: '_index.html.tpl',
            handlebars: '_handlebars.html.tpl',
            js: '_common.js.tpl',
            json: '_index.json.tpl',
            mocha: '_mocha.spec.js.tpl',
            php: '_index.php.tpl',
            requirejs: '_require.js.tpl',
            task: '_task.js.tpl'
        },
        // requires
        path = require('path'),
        chalk = require('chalk'),
        fse = require('fs-extra'),
        program = require('commander');

    /**
     *
     * Write File
     *
     */
    function kissOut(file, filetype) {
        try {
            ext = path.basename(allowedTypes[filetype], '.tpl').split('.').slice(1).join('.');
            heyfile = path.join(__dirname, '..', 'templates', allowedTypes[filetype]);
            rstream = fse.createReadStream(heyfile);
            yofile = path.join(cwd, (file + '.' + ext));
            fse.ensureFileSync(yofile);
            wstream = fse.createWriteStream(yofile);
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
        .usage('[filetype] [path/fo/file/wo_extension]')
        .description(description)
        .parse(process.argv);

    if (program.args.length < 1) {
        process.stderr.write(chalk.bold.red('Error: ') + chalk.red('missing arguments\n'));
        program.outputHelp();
        process.exit(1);
        // error
    }

    // si le file type n'est pas present
    // prompt inquirer
    /*
    if(program.args.length < 2){

    }
    */

    if (Object.keys(allowedTypes).indexOf(program.args[1]) < 0) {
        process.stderr.write(chalk.bold.red('Error: ') + chalk.red('invalid file type'));
        program.outputHelp();
        process.exit(1);
        // error
    }

    kissOut(program.args[0], program.args[1]);

}());
