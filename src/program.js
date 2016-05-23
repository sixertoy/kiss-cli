/* global module, process, require */
(function () {

    'use strict';

    var fs = require('fs'),
        utils = require('./program-utils'),

        /**
         *
         * CLI arguments parser
         *
         */
        Program = {

            _args: false,

            /* ---------------------------------

            Public

            --------------------------------- */

            /**
             *
             * Parse arguments from process
             *
             */
            parse: function () {
                this._args = process.argv.slice(2);
                if (!this._args.length) {
                    utils.exit('Missing arguments');
                }
                return this;
            },

            /**
             *
             * Output template content and exit
             *
             */
            print: function (files) {
                var keys = Object.keys(files),
                    valid = this._args.length < 2;
                valid = valid && keys.indexOf(this._args[0]) !== -1;
                if (valid) {
                    // show content of a template type
                    utils.version();
                    utils.print(this._args.shift(), files);
                    process.exit(0);
                }
            },

            /**
             *
             * Show KISS cli version
             *
             */
            needversion: function () {
                var valid = this._args.indexOf('-V') !== -1;
                valid = valid || this._args.indexOf('--version') !== -1;
                if (valid && this._args.length > 1) {
                    // exit
                    utils.exit('Too much arguments');
                } else if (valid) {
                    utils.version();
                    process.exit(0);
                }
                return valid;
            },

            /**
             *
             * Check if help is needed
             *
             */
            needhelp: function () {
                var valid = this._args.indexOf('-h') !== -1;
                valid = valid || this._args.indexOf('--help') !== -1;
                if (valid && this._args.length > 1) {
                    // exit
                    utils.exit('Too much arguments');
                }
                return valid;
            },

            /**
             *
             * Check if first argument is a file
             *
             */
            isfile: function () {
                var valid;
                try {
                    valid = this._args.length;
                    valid = valid && (typeof this._args[0] === 'string');
                    valid = valid && (this._args[0].indexOf('.') !== -1);
                    return valid;
                } catch (e) {
                    // exit with an error and prompt help
                    utils.exit('Unknow template type');
                }
                return false;
            },

            /**
             *
             * Check if first argument is a file
             *
             */
            isknowtype: function (files) {
                var value = this._args[0],
                    keys = Object.keys(files),
                    valid = keys.indexOf(value) !== -1;
                if (!valid) {
                    value = false;
                }
                return value;
            },

            args: function () {
                return [].concat(this._args);
            }

        };

    module.exports = Program;

}());
