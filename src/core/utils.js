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
                if (process.stdout.isTTY) {
                    process.stdout.write(msg);
                }
            },

            /**
             *
             *
             *
             */
            success: function (msg) {
                if (process.stdout.isTTY) {
                    var value = colors.green(msg);
                    process.stdout.write(value);
                }
            },

            debug: function (msg) {
                if (process.stdout.isTTY) {
                    var value = colors.gray(msg);
                    process.stdout.write(value);
                }
            },

            error: function (msg) {
                if (process.stderr.isTTY) {
                    var value = colors.red('Error: ');
                    value += colors.red(msg + constants.NEW_LINE);
                    program.outputHelp();
                    process.stderr.write(value);
                }
                throw new Error(msg);
            },

            /**
             *
             *
             *
             */
            semver: function () {
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
