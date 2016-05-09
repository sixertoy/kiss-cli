/* eslint no-process-env: 0 */
/* global require, module, process */
(function () {

    'use strict';

    var path = require('path'),
        // requires
        colors = require('./colors'),
        consts = require('./constants'),

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
                var semver = Utils.semver();
                Utils.info('Kiss v' + semver + consts.NEW_LINE);
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
                msg += consts.INDENT + 'kiss [options]' + consts.NEW_LINE;
                msg += consts.INDENT + 'kiss <filepath> [...]';
                msg += consts.INDENT + 'kiss <filepath> [...] <type>';
                msg += consts.NEW_LINE;
                Utils.log(msg);
            },

            describe: function () {
                Utils.version();
                var msg = 'Keep It Stupid Simple templated files generator';
                msg += consts.NEW_LINE;
                Utils.debug(msg);
                Utils.usage();
                Utils.options();
            },

            print: function () {
                /*
                var valid = this._program.args.length === 1;
                valid = valid && this._templates.hasOwnProperty(this._program.args[0]);
                if (valid) {
                    // show content of a template type
                    print(this._program.args[0], this._templates);
                    process.exit(0);
                }
                return false;
                */
            },

            /**
             *
             *
             *
             */
            info: function (msg) {
                var value = colors.magenta(msg);
                process.stdout.write(value);
            },

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
                var value;
                if (process.stdout.isTTY) {
                    value = colors.green(msg);
                    process.stdout.write(value);
                }
            },

            debug: function (msg) {
                var value;
                if (process.stdout.isTTY) {
                    value = colors.gray(msg);
                    process.stdout.write(value);
                }
            },

            error: function (msg) {
                var value;
                if (process.stderr.isTTY) {
                    value = colors.red('Error: ');
                    value += colors.red(msg + consts.NEW_LINE);
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
             *
             * return current user home path
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
