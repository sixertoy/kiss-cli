/* globals process, require */
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
        FileWriter = function (destinationFile, filetype, types) {
            var input, parsed, output, rstream, wstream,
                extension = '';
            try {
                // get template filename
                input = types[filetype];
                parsed = path.parse(input);
                extension = parsed.ext;
                // get template content
                rstream = fse.createReadStream(input);
                // get output filepath
                output = path.join(constants.CURRENT_WD, destinationFile + extension);
                // check if file can be writtent
                fse.ensureFileSync(output);
                // write template content into output
                input = constants.DOT + path.sep + path.relative(constants.CURRENT_WD, output);
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
                utils.log('Unable to write file');
                process.exit(1);
            }
        };

    module.exports = FileWriter;

}());
