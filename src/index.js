/*jslint indent: 4, nomen: true */
/*globals process, require, __dirname */

(function () {

    'use strict';

    var semver = '0.1.31',
        // requires
        fs = require('fs'),
        path = require('path'),
        chalk = require('chalk'),
        fse = require('fs-extra'),
        program = require('commander'),
        assign = require('deep-assign'),
        // variables
        valid = false,
        usedebug = false,
        // file and type defined by cli arguments
        argFile = false,
        argType = false,
        // array containing templates names and tamplates paths
        allowedTypes = false,
        // unix end line to show in console
        newline = '\n',
        // current working dir
        cwd = process.cwd(),
        // description to show on kiss --help
        description = 'Filetypes:',
        // kiss-cli absolute path
        mcwd = module.id.split(path.sep).slice(0, -2).join(path.sep);

    /**
     *
     * Stop process if an error
     * Show a message
     * Log program help
     *
     */
    function _throwAbortedError(msg) {
        process.stderr.write(chalk.bold.red('Error: ') + chalk.red(msg + '\n'));
        program.outputHelp();
        process.exit(1);
    }

    /**
     *
     * Remove excluded files from fs.readdir results
     *
     */
    function _removeExcluded(files) {
        // files to excludes for templatings
        var value, indexof,
            excludes = [
                // Windows
                'Thumbs.db',
                'ehthumbs.db',
                'Desktop.ini',
                // OSX
                '.DS_Store',
                '.AppleDouble',
                '.LSOverride',
                // Externals
                '.Spotlight-V100',
                '.Trashes'
            ],
            results = [].concat(files);
        while (excludes.length) {
            value = excludes.splice(0, 1)[0];
            indexof = results.indexOf(value);
            if (indexof >= 0) {
                results.splice(indexof, 1);
            }
        }
        return results;
    }

    /**
     *
     * Return an object
     * Keys are file basename
     * Will populate path for files
     *
     */
    function _populatedWithPath(files, filepath) {
        var value,
            results = {},
            copy = [].concat(files);
        while(copy.length) {
            value = copy.splice(0, 1)[0];
            results[value.split('.')[0]] = path.join(filepath, value);
        }
        return results;
    }

    /**
     *
     * Return allowed types for help logs
     *
     */
    function _getAllowedTypes() {
        var files, currentpath,
            results = {},
            dir = '.kiss';
        // iterates trough kiss module templates
        currentpath = path.join(mcwd, dir);
        try {
            files = fs.readdirSync(currentpath);
            files = _removeExcluded(files);
            files = _populatedWithPath(files, currentpath);
        } catch (e) {
            _throwAbortedError('unable to scan dir: ' + currentpath);
        }
        results = assign(results, files);
        // iterates trough current working directory templates
        currentpath = path.join(cwd, dir);
        try {
            files = fs.readdirSync(currentpath);
            files = _removeExcluded(files);
            files = _populatedWithPath(files, currentpath);
        } catch (e) {
            files = {};
        }
        results = assign(results, files);
        return results;
    }

    /**
     *
     * Write File
     *
     */
    function _kissOut(file, filetype) {
        var input, output, rstream, wstream;
        try {
            // get template filename
            input = allowedTypes[filetype];
            // get template content
            rstream = fse.createReadStream(input);
            // get output filepath
            output = path.join(cwd, file);
            // check if file can be writtent
            fse.ensureFileSync(output);
            // write template content into output
            wstream = fse.createWriteStream(output);
            // on stream end output debug
            rstream.on('end', function () {
                if (usedebug) {
                    console.log(chalk.green('file: ' + output + ' has been written'));
                }
                process.exit(0);
            });
            // write stream
            rstream.pipe(wstream);
        } catch (e) {
            _throwAbortedError('unable to write file');
        }
    }

    // setup help and options
    program
        .version(semver)
        .option('-d, --debug', 'Show files paths')
        .usage('[filetype] [path/to/output/file]')
        .parse(process.argv);

    // setup debug
    usedebug = program.debug || false;

    // will iterates trough directories
    // to get templates files
    allowedTypes = _getAllowedTypes();

    // populate description for help log
    Object.keys(allowedTypes).forEach(function (key) {
        description += newline + '\t' + key;
        if (usedebug) {
            description += chalk.green( ' ' + allowedTypes[key]);
        }
    });
    // setup help logs
    program.description(description);

    // if no args will output an error
    valid = (program.args.length > 1);
    if (!valid) {
        _throwAbortedError('missing arguments');
    }

    argType = program.args[0];
    argFile = program.args[1];
    // if argument is not a allowed file type
    valid = (Object.keys(allowedTypes).indexOf(argType) >= 0);
    if (!valid) {
        _throwAbortedError('invalid file type');
    }

    _kissOut(argFile, argType);

}());
