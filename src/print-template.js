/* global require, module */
(function () {

    'use strict';

    var fs = require('fs'),
        utils = require('./core/utils'),

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
                utils.debug(output);
            } catch (e) {
                utils.error('unable to write file');
            }
        };

    module.exports = Print;

}());
