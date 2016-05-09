/* global require, module, process */
(function () {

    'use strict';

    var utils = require('./utils'),
        print = require('./../print-template'),


        Validation = {

            _program: false,
            _templates: false,

            setProgram: function (value) {
                this._program = value;
                return this;
            },

            setTemplates: function (value) {
                this._templates = value;
                return this;
            },

            hasArguments: function () {
                var valid = this._program.args.length;
                if (!valid) {
                    this._program.outputHelp();
                    utils.error('Missing arguments');
                    process.exit(1);
                }
                return true;
            },

            printTemplate: function () {
                var valid = this._program.args.length === 1;
                valid = valid && this._templates.hasOwnProperty(this._program.args[0]);
                if (valid) {
                    // show content of a template type
                    print(this._program.args[0], this._templates);
                    process.exit(0);
                }
                return false;
            }

        };

    module.exports = Validation;

}());
