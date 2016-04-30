/* global require, module, process */
(function () {

    'use strict';

    var fs = require('fs'),
        utils = require('./core/utils'),
        colors = require('./core/colors'),

        /**
         *
         *
         *
         */
        Print = function (filetype, types) {
            var input, output;
            try {
                // get template filename
                input = types[filetype];
                // get template content
                output = fs.readFileSync(input, 'utf8');
                // output file content to console
                console.log(colors.gray(output));
            } catch (e) {
                utils.log('unable to write file');
                process.exit(1);
            }
        };

    module.exports = Print;

}());
