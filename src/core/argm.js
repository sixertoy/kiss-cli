/* global module, process, require */
(function () {

    'use strict';

    var utils = require('./utils'),
        argm = {

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
                    utils.version();
                    utils.usage();
                    utils.options();
                    utils.error('Missing arguments');
                    process.exit(0);
                }
                return this;
            },

            files: function () {
                return this._args;
            },

            /**
             *
             * Show KISS cli version
             *
             */
            needversion: function () {
                var valid = this._args.indexOf('-V') !== -1;
                valid = valid || this._args.indexOf('--version') !== -1;
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
                return valid;
            }

        };

    module.exports = argm;

}());
