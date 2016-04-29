/*globals process, require, __dirname */
(function () {

    'use strict';

    // unix end line to show in console
    var NEW_LINE = '\n',
        // current working dir
        CURRENT_WD = process.cwd(),
        // kiss-cli absolute path
        path = require('path'),
        modulepath = path.join(__dirname, '..'),
        //
        pkg = require(path.join(modulepath, 'package.json')),
        semver = pkg.version,
        //
        lookup = require('./lookup'),
        colors = require('./colors'),
        // requires
        fs = require('fs'),
        fse = require('fs-extra'),
        program = require('commander'),
        assign = require('deep-assign'),
        // variables
        valid = false,
        // file and type defined by cli arguments
        argFile = false,
        argType = false,
        // array containing templates names and tamplates paths
        types = false,
        // description to show on kiss --help
        description = 'Filetypes:';

    function homeuser() {
        return process.env.HOME || process.env.USERPROFILE;
    }

    /**
     *
     * Stop process if an error
     * Show a message
     * Log program help
     *
     */
    function _throwAbortedError(msg) {
        var value = colors.red('Error: ') + colors.red(msg + NEW_LINE);
        program.outputHelp();
        process.stderr.write(value);
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
            value = excludes.pop();
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
        while (copy.length) {
            value = copy.pop();
            results[value.split('.')[0]] = path.join(filepath, value);
        }
        return results;
    }

    /**
     *
     * Return allowed types for help logs
     *
     */
    function _getSnippetTypes(shorten) {
        var files, currentpath,
            results = {},
            dir = '.kiss';
        // iterates trough kiss module templates
        currentpath = path.join(modulepath, dir);
        try {
            files = fs.readdirSync(currentpath);
            files = _removeExcluded(files);
            files = _populatedWithPath(files, currentpath);
        } catch (e) {
            _throwAbortedError('Unable to scan dir: ' + currentpath);
            process.exit(1);
        }
        results = assign(results, files);

        // iterates through user home directory
        currentpath = homeuser();
        currentpath = path.join(currentpath, dir);
        try {
            files = fs.readdirSync(currentpath);
            files = _removeExcluded(files);
            files = _populatedWithPath(files, currentpath);
        } catch (e) {
            files = {};
        }
        results = assign(results, files);

        // iterates trough current working directory templates
        currentpath = lookup('.kiss');
        if (currentpath) {
            files = fs.readdirSync(currentpath);
            files = _removeExcluded(files);
            files = _populatedWithPath(files, currentpath);
            results = assign(results, files);
        }

        return results;
    }

    /**
     *
     *
     *
     */
    function _print(filetype, types) {
        var input, output;
        try {
            // get template filename
            input = types[filetype];
            // get template content
            output = fs.readFileSync(input, 'utf8');
            // output file content to console
            console.log(colors.gray(output));
        } catch (e) {
            _throwAbortedError('unable to write file');
            process.exit(1);
        }
    }

    function _describe(types) {
        // populate description for help log
        var key,
            desc = '',
            home = homeuser(),
            keys = Object.keys(types).sort();
        while (keys.length) {
            key = keys.shift();
            desc += NEW_LINE + '\t' + key;
            desc += colors.green(' ' + types[key].replace(home, '~'));
        }
        return desc;
    }

    /**
     *
     * Write File
     *
     */
    function _write(file, filetype, types) {
        var input, output, rstream, wstream;
        try {
            // get template filename
            input = types[filetype];
            // get template content
            rstream = fse.createReadStream(input);
            // get output filepath
            output = path.join(CURRENT_WD, file);
            // check if file can be writtent
            fse.ensureFileSync(output);
            // write template content into output
            input = '.' + path.sep + path.relative(CURRENT_WD, output);
            console.log(colors.gray('Written: ' + input));
            wstream = fse.createWriteStream(output);
            // on stream end output debug
            rstream.on('end', function () {
                console.log(colors.green('Success!'));
                process.exit(0);
            });
            // write stream
            rstream.pipe(wstream);
        } catch (e) {
            _throwAbortedError('Unable to write file');
            process.exit(1);
        }
    }
    // will iterates trough directories
    // to get templates files
    types = _getSnippetTypes();

    description += _describe(types);

    // setup help and options
    program
        .version(semver)
        .option('-D, --debug', 'Show availables templates')
        .description(description)
        .usage('[path/to/output/file] [filetype]')
        .parse(process.argv);

    // options -D or --debug
    valid = program.show;
    if (valid) {
        // if no arguments
        // show availables templates
        if (!program.args.length) {
            console.log(description);
            process.exit(0);
        }
        // if arguments and first arguments is a valid type
        // show content of a template type
        valid = program.args.length >= 1;
        valid = valid && types.hasOwnProperty(program.args[0]);
        if (valid) {
            _print(program.args[0], types);
            process.exit(0);
        }
        // more than 1 arguments with command --debug or -D
        // will throw an error
        _throwAbortedError('Wrong arguments');
        process.exit(1);
    }

    // if no arguments
    valid = program.args.length >= 2;
    if (!valid) {
        _throwAbortedError('Missing arguments');
        process.exit(1);
    }

    argFile = program.args[0];
    argType = program.args[1];

    // if type is not a valid template type
    valid = types.hasOwnProperty(argType);
    if (!valid) {
        _throwAbortedError('Invalid template file');
        process.exit(1);
    }

    // write file
    _write(argFile, argType, types);

}());
