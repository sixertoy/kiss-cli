/* globals module, require */
(function () {

    'use strict';

    var path = require('path'),
        fse = require('fs-extra'),
        // requires
        utils = require('./core/utils'),
        constants = require('./core/constants'),

        /**
         *
         * Write Destination File
         *
         */
        OutputWriter = {

            /**
             *
             * Check if destination file has an extension
             *
             */
            _hasExtension: function (input) {
                var ext = path.extname(input);
                return (ext !== '' && ext !== constants.DOT);
            },

            /**
             *
             * If user define the output file with a trailing dot
             * It remove this trailing dot
             * It do not add extension to the output file
             *
             */
            _removeTrailingDot: function (input) {
                var dest = input,
                    valid = (dest.charAt(dest.length - 1) === constants.DOT);
                if (!valid) {
                    return dest;
                }
                return dest.substring(0, dest.length - 1);
            },

            /**
             *
             * Check if the destination file is a dot file
             * If it is a dot file do not add an extension
             *
             */
            _isDotFile: function (input) {
                var base = path.basename(input),
                    result = (base.charAt(0) === constants.DOT);
                return result;
            },

            /**
             *
             * Check if file has a trailing dot as last char
             * If it is a trailing dot, remove this dot and do not add extension
             *
             */
            _isTrailingDot: function (input) {
                var base = path.basename(input),
                    result = (base.charAt(base.length - 1) === constants.DOT);
                return result;
            },

            _getTemplateExtension: function (input) {
                var dest = input,
                    obj = path.parse(dest),
                    index = obj.base.indexOf('.');
                if (index <= 0) {
                    return '';
                }
                return obj.base.substring(index);
            },

            /**
             *
             * Returns full filepath for output file
             * With extension from user selected tempates
             *
             */
            _getOutputFile: function (destination, ext) {
                var obj,
                    dest = destination,
                    isdotfile = OutputWriter._isDotFile(dest),
                    hasextension = OutputWriter._hasExtension(dest),
                    istrailingdot = OutputWriter._isTrailingDot(dest);
                //
                // add extension to output file name
                // for user selected template
                if (!isdotfile && !istrailingdot && !hasextension) {
                    dest = (dest + ext);
                } else if (istrailingdot && !hasextension) {
                    obj = path.parse(destination);
                    dest = OutputWriter._removeTrailingDot(obj.base);
                    dest = path.join(obj.dir, dest);
                }
                return dest;
            },

            _write: function (destinationfile, extension, rstream) {
                // get absolute fullpath to output file from current dir
                var wstream,
                    dest = OutputWriter._getOutputFile(destinationfile, extension),
                    outputpath = path.relative(constants.CURRENT_WD, dest);

                process.stdout.cursorTo(0);
                utils.debug('Write: ' + outputpath + constants.NEW_LINE);
                process.stdout.clearLine(1);
                // check if path exists and file can be written
                fse.ensureFileSync(outputpath);
                // write template content into output
                wstream = fse.createWriteStream(outputpath);
                // stream template content to outputfile
                rstream.pipe(wstream);
            },

            write: function (outputfiles, templatefile, callback) {
                var rstream, extension,
                    files = [].concat(outputfiles);
                try {
                    // utils.progress();
                    // get template extension
                    extension = OutputWriter._getTemplateExtension(templatefile);
                    // open a new stream able to read template file content
                    rstream = fse.createReadStream(templatefile);
                    // on stream end output debug
                    rstream.on('end', function () {
                        // process.stdout.cursorTo(0);
                        // process.stdout.clearLine(1);
                        if (!files.length) {
                            callback();
                        }
                    });
                    while (files.length) {
                        OutputWriter._write(files.shift(), extension, rstream);
                    }
                } catch (e) {
                    utils.error('Unable to write file', e.message);
                }
            }
        };

    module.exports = OutputWriter;

}());
