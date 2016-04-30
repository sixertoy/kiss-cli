/* global require, module */
(function () {

    'use strict';

    var path = require('path'),

        /**
         *
         *
         */
        Constants = {
            SEMVER: '',
            DOT: '.',
            TAB: '\t',
            TILDE: '~',
            WHITESPACE: ' ',
            // unix end line to show in console
            NEW_LINE: '\n',
            // Template directory name
            KISS_DIR: '.kiss',
            // current working dir
            CURRENT_WD: process.cwd(),
            // kiss-cli absolute path
            MODULE_PATH: path.join(__dirname, '..', '..'),
        };

    module.exports = Constants;

}());
