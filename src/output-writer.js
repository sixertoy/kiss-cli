/* globals module, require */
(function () {

    'use strict';

    var path = require('path'),
        fse = require('fs-extra'),
        // requires
        utils = require('./core/utils'),
        colors = require('./core/colors'),
        constants = require('./core/constants'),

        /**
         *
         * Write Destination File
         *
         */
        FileWriter = {

            _getExtension: function (input) {
                var dest = input,
                    obj = path.parse(dest),
                    index = dest.indexOf('.');
                if (index <= 0) {
                    return '';
                }
                return obj.base.substring(index);
            },

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
                return dest.substring(0, dest.length -1);
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

            write: function (destinationFile, filetype, types) {
                var input, output, rstream, wstream,
                    istrailingdot, isdotfile, hasextension,
                    extension = '',
                    dest = destinationFile;
                try {
                    // get template filename
                    input = types[filetype];
                    isdotfile = FileWriter._isDotFile(dest);
                    hasextension = FileWriter._hasExtension(dest);
                    istrailingdot = FileWriter._isTrailingDot(dest);
                    if (!isdotfile && !istrailingdot && !hasextension) {
                        // add extension to outpur file name
                        extension = FileWriter._getExtension(input);
                        dest = (dest + extension);
                    }
                    /*
                    if (!FileWriter._hasExtension(dest)) {
                        extension = FileWriter._getExtension(input);
                        dest = (dest + extension);

                    } else if (FileWriter._isDot(dest)) {
                        dest = FileWriter._removeTrailingDot(dest);
                    }
                    */
                    // get template content
                    rstream = fse.createReadStream(input);
                    // get output filepath
                    output = path.join(constants.CURRENT_WD, dest);
                    // check if file can be writtent
                    fse.ensureFileSync(output);
                    // write template content into output
                    input = path.relative(constants.CURRENT_WD, output);
                    input = constants.DOT + path.sep + input;
                    console.log(colors.gray('Written: ' + input));
                    wstream = fse.createWriteStream(output);
                    // on stream end output debug
                    rstream.on('end', function () {
                        utils.success(('Success!'));
                    });
                    // write stream
                    rstream.pipe(wstream);
                } catch (e) {
                    utils.error('Unable to write file');
                }
            }
        };

    module.exports = FileWriter;

}());
