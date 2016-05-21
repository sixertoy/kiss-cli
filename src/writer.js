/* globals module, require */
(function () {

    'use strict';

    var path = require('path'),
        fse = require('fs-extra'),
        // requires
        utils = require('./program-utils'),
        wutils = require('./writer-utils'),
        constants = require('./core/constants'),

        /**
         *
         * Write Destination File
         *
         */
        Writer = {

            _callback: false,

            /**
             *
             * Returns full filepath for output file
             * With extension from user selected tempates
             *
             */
            _getOutputFile: function (destination, ext) {
                var obj,
                    dest = destination,
                    isdotfile = wutils.isDotFile(dest),
                    hasextension = wutils.hasExtension(dest),
                    istrailingdot = wutils.isTrailingDot(dest);
                //
                // add extension to output file name
                // for user selected template
                if (!isdotfile && !istrailingdot && !hasextension) {
                    dest = (dest + ext);

                } else if (istrailingdot && !hasextension) {
                    obj = path.parse(destination);
                    dest = wutils.removeTrailingDot(obj.base);
                    dest = path.join(obj.dir, dest);
                }
                return dest;
            },

            _write: function (destinationfile, ext, rstream) {
                // get absolute fullpath to output file from current dir
                var wstream,
                    dest = this._getOutputFile(destinationfile, ext),
                    outputpath = path.relative(constants.CURRENT_WD, dest);

                // process.stdout.cursorTo(0);
                utils.debug('Write: ' + outputpath + constants.NEW_LINE);
                // process.stdout.clearLine(1);
                // check if path exists and file can be written
                fse.ensureFileSync(outputpath);
                // write template content into output
                wstream = fse.createWriteStream(outputpath);
                rstream.pipe(wstream);
            },

            _writeslow: function (files, templates) {
                var type, file, rstream, tpl, ext,
                    msg = '',
                    self = this,
                    otype = false,
                    keys = Object.keys(templates);
                function __onstreamend__() {
                    if (!files.length) {
                        self._callback();
                    }
                }
                while (files.length) {
                    file = files.shift();
                    type = wutils.gettype(file, keys);
                    if (!type) {
                        msg = 'Unable to write file ';
                        msg += '\'' + file + '\'' + '. Unknow type';
                        utils.error(msg, false);
                    } else if (type !== otype) {
                        // create a new stream
                        tpl = templates[type];
                        rstream = fse.createReadStream(tpl);
                        rstream.on('end', __onstreamend__);
                    }
                    if (type) {
                        otype = type;
                        ext = wutils.getTemplateExtension(tpl);
                        // remove file current type extension
                        file = file.replace('.' + type, '');
                        this._write(file, ext, rstream);
                    }
                }
                return false;
            },

            _writefast: function (files, template) {
                var file,
                    self = this,
                    extension = wutils.getTemplateExtension(template),
                    rstream = fse.createReadStream(template);
                rstream.on('end', function () {
                    if (!files.length) {
                        self._callback();
                    }
                });
                while (files.length) {
                    file = files.shift();
                    this._write(file, extension, rstream);
                }
                return true;
            }
        };

    /**
     *
     * Main entry point function
     *
     */
    module.exports = function (outputfiles, template, callback) {
        Writer._callback = callback;
        var isfast,
            files = [].concat(outputfiles);
        try {
            // if template is a string will create only once stream reader
            if (typeof template === 'string') {
                isfast = Writer._writefast(files, template);
            }
            // else wil create multiple stream for each template
            isfast = Writer._writeslow(files, template);

        } catch (e) {
            utils.stop('Error while writing file(s)');

        }
        return isfast;
    };

}());
