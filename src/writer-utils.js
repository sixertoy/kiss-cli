/* globals module, require */
(function() {

    'use strict';

    var path = require('path'),
        constants = require('./core/constants'),

        /**
         *
         * Write Destination File
         *
         */
        WriterUtils = {

            /**
             *
             * Check if destination file has an extension
             *
             */
            hasextension: function(input) {
                var ext = input.substring(input.lastIndexOf(constants.DOT));
                return (ext !== input && ext !== '' && ext !== constants.DOT);
            },

            /**
             *
             * If user define the output file with a trailing dot
             * It remove this trailing dot
             * It do not add extension to the output file
             *
             */
            removetrailingdot: function(input) {
                var dest = input,
                    valid = (dest.charAt(dest.length - 1) === constants.DOT);
                if (!valid) {
                    return dest;
                }
                return dest.substring(0, dest.length - 1);
            },

            /**
             *
             * Check if the destination file is a dot file
             * If it is a dot file do not add an extension
             *
             */
            isdotfile: function(input) {
                var spl = input.split(path.sep),
                    val = spl[spl.length - 1];
                return val.indexOf(constants.DOT) === 0;
            },

            /**
             *
             * Check if file has a trailing dot as last char
             * If it is a trailing dot, remove this dot and do not add extension
             *
             */
            istrailingdot: function(input) {
                var base = path.basename(input),
                    result = (base.charAt(base.length - 1) === constants.DOT);
                return result;
            },

            getextension: function(input) {
                var dest = input,
                    obj = path.parse(dest),
                    index = obj.base.indexOf(constants.DOT);
                if (index <= 0) {
                    return '';
                }
                return obj.base.substring(index);
            },

            gettype: function(file, keys) {
                var result = false,
                    ext = path.extname(file);
                if (ext !== '' && ext !== constants.DOT) {
                    // remove first dot
                    ext = ext.substring(1);
                    if (keys.indexOf() !== ext) {
                        result = ext;
                    }
                }
                return result;
            }

        };

    /**
     *
     * Main entry point function
     *
     */
    module.exports = WriterUtils;

}());
