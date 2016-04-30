/* global require, module, process */
(function () {

    'use strict';

    var path = require('path'),
        program = require('commander'),
        // requires
        colors = require('./colors'),
        constants = require('./constants'),

        /**
         *
         * Stop process if an error
         * Show a message & Log program help
         *
         */
        Utils = {

            /**
             *
             *
             *
             */
            log: function (msg) {
                var value = colors.red('Error: ') + colors.red(msg + constants.NEW_LINE);
                program.outputHelp();
                process.stderr.write(value);
            },

            /**
             *
             *
             *
             */
            semver: function() {
                var pkg = path.join(constants.MODULE_PATH, 'package.json');
                pkg = require(pkg);
                return pkg.version;
            },

            /**
             *
             *
             * return current user home path
             *
             */
            homeuser: function () {
                return process.env.HOME || process.env.USERPROFILE;
            }

        };

    module.exports = Utils;

}());
