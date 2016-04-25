/*globals process, require, __dirname */
(function () {

    'use strict';

    // kiss-cli absolute path
    var path = require('path'),
        mcwd = path.join(__dirname, '..'),
        //
        pkg = require(path.join(mcwd, 'package.json')),
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
        useshow = false,
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
        description = 'Filetypes:';

    function _getUserHome() {
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
        var value = colors.red('Error: ') + colors.red(msg + '\n');
        process.stderr.write(value);
        program.outputHelp();
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
            process.exit(1);
        }
        results = assign(results, files);

        // iterates through user home directory
        currentpath = _getUserHome();
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
    function _kissOutContent(filetype) {
        var input, output;
        try {
            // get template filename
            input = allowedTypes[filetype];
            // get template content
            output = fs.readFileSync(input, 'utf8');
            // output file content to console
            console.log(colors.gray(output));
        } catch (e) {
            _throwAbortedError('unable to write file');
            process.exit(1);
        }
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
                    console.log(colors.green('file: ' + output + ' has been written'));
                }
                process.exit(0);
            });
            // write stream
            rstream.pipe(wstream);
        } catch (e) {
            _throwAbortedError('unable to write file');
            process.exit(1);
        }
    }

    // setup help and options
    program
        .version(semver)
        .option('-S, --show', 'Show availables templates')
        .option('-D, --debug', 'Full debug')
        .usage('[filetype] [path/to/output/file]')
        .parse(process.argv);

    // setup debug
    useshow = program.show || false;
    usedebug = program.debug || false;

    // will iterates trough directories
    // to get templates files
    allowedTypes = _getAllowedTypes();

    // populate description for help log
    Object.keys(allowedTypes).forEach(function (key) {
        description += newline + '\t' + key;
        if (usedebug || useshow) {
            description += colors.green(' ' + allowedTypes[key]);
        }
    });
    // setup help logs
    program.description(description);

    // show availables templates
    valid = useshow;
    valid = valid && !program.args.length;
    if (valid) {
        console.log(description);
        process.exit(0);
    }

    // debug
    valid = usedebug;
    valid = valid && !program.args.length;
    if (valid) {
        program.outputHelp();
        process.exit(0);
    }

    // if no args will output an error
    valid = (program.args.length >= 1);
    if (!valid) {
        _throwAbortedError('missing arguments');
        process.exit(1);
    }

    argType = program.args[1];
    // show tempate content
    valid = (program.args.length > 0 && useshow);
    valid = valid && (Object.keys(allowedTypes).indexOf(argType) >= 0);
    if (valid) {
        _kissOutContent(argType);
        process.exit(0);
    }

    // if argument is not a allowed file type
    valid = (program.args.length > 1);
    if (!valid) {
        _throwAbortedError('invalid file type');
        process.exit(1);
    }

    argFile = program.args[0];
    valid = valid && (Object.keys(allowedTypes).indexOf(argType) >= 0);
    if (!valid) {
        _throwAbortedError('invalid file type');
        process.exit(1);
    }

    _kissOut(argFile, argType);

}());
