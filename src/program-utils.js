/* eslint no-process-env: 0 */
/* global require, module, process */
(function () {

    'use strict';

    var fs = require('fs'),
        path = require('path'),
        // requires
        colors = require('./core/colors'),
        consts = require('./core/constants'),
        WELCOME_MSG = 'Keep It Stupid Simple templated files generator',

        /**
         *
         * Stop process if an error
         * Show a message & Log program help
         *
         */
        Utils = {

            _semver: false,
            _homeuser: false,

            version: function () {
                var semver = Utils.semver(),
                    msg = 'Kiss v' + semver + consts.NEW_LINE;
                Utils.info(msg);
                msg = WELCOME_MSG + consts.NEW_LINE;
                Utils.debug(msg);
            },

            options: function () {
                var msg = consts.NEW_LINE;
                // option
                msg += 'Options:' + consts.NEW_LINE;
                // help option
                msg += consts.INDENT + '-h, --help';
                msg += consts.INDENT + consts.INDENT;
                msg += 'Ouput kiss-cli help' + consts.NEW_LINE;
                // version option
                msg += consts.INDENT + '-V, --version';
                msg += consts.INDENT + consts.INDENT;
                msg += 'Ouput kiss-cli version' + consts.NEW_LINE;
                msg += consts.NEW_LINE;
                Utils.log(msg);
            },

            usage: function () {
                var msg = consts.NEW_LINE;
                // Usage
                msg += 'Usage:' + consts.NEW_LINE;
                msg += consts.INDENT + 'kiss <options>';
                msg += consts.NEW_LINE;
                msg += consts.INDENT + 'kiss <type>';
                msg += consts.NEW_LINE;
                msg += consts.INDENT + 'kiss <filename.type> [...]';
                msg += consts.NEW_LINE;
                msg += consts.INDENT + 'kiss <type> <relative/filename> [...]';
                msg += consts.NEW_LINE;
                Utils.log(msg);
            },

            help: function (desc) {
                Utils.version();
                Utils.usage();
                Utils.options();
                Utils.log(desc);
                // exit
                process.exit(0);
            },

            exit: function (reason, trow) {
                Utils.version();
                Utils.usage();
                Utils.options();
                Utils.error(reason, trow);
                process.exit(1);
            },

            /**
             *
             * Print template's content to console
             *
             * @param {String} filetype
             * @param {Object} types
             *
             */
            print: function (filetype, types) {
                var input, output;
                try {
                    // get template filename
                    input = types[filetype];

                    output = consts.NEW_LINE;
                    output += 'Template content:';
                    Utils.log(output);
                    output = consts.NEW_LINE + input;
                    Utils.success(output);
                    // get template content
                    output = consts.NEW_LINE;
                    output += fs.readFileSync(input, 'utf8');
                    output += consts.NEW_LINE;
                    // output file content to console
                    Utils.debug(output);
                } catch (e) {
                    Utils.exit('Unable to print template');
                }
            },

            /**
             *
             * Show a magenta colored message
             *
             */
            info: function (msg) {
                var value = colors.magenta(msg);
                process.stdout.write(value);
            },

            /**
             *
             * Log a message in console
             *
             */
            log: function (msg) {
                if (process.stdout.isTTY) {
                    process.stdout.write(msg);
                }
            },

            /**
             *
             * Show a green colored mesage
             *
             */
            success: function (msg) {
                var value;
                if (process.stdout.isTTY) {
                    value = colors.green(msg);
                    process.stdout.write(value);
                }
            },

            /**
             *
             * Show a gray colored message
             *
             */
            debug: function (msg) {
                var value;
                if (process.stdout.isTTY) {
                    value = colors.gray(msg);
                    process.stdout.write(value);
                }
            },

            /**
             *
             * Show a red clored message
             *
             * @param {String} msg
             * @param {Boolean} throwerror - wether throw an error catcheble by cli
             *
             */
            error: function (msg, throwerror) {
                var value,
                    thrw = throwerror;
                if (arguments.length < 2) {
                    thrw = true;
                }
                if (process.stderr.isTTY) {
                    value = colors.red('Error: ');
                    value += colors.red(msg + consts.NEW_LINE);
                    process.stderr.write(value);
                }
                if (thrw) {
                    throw new Error(msg);
                }
            },

            /**
             *
             *
             *
             */
            semver: function () {
                var pkg;
                if (!this._semver) {
                    pkg = path.join(consts.MODULE_PATH, 'package.json');
                    pkg = require(pkg);
                    this._semver = pkg.version;
                }
                return this._semver;
            },

            /**
             *
             * Returns current user home path
             *
             */
            homeuser: function () {
                var env;
                if (!this._homeuser) {
                    env = process.env;
                    this._homeuser = env.HOME || env.USERPROFILE;
                }
                return this._homeuser;
            }

        };

    module.exports = Utils;

}());
