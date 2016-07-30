/* global require, module */
(function() {

    'use strict';

    var fs = require('fs'),
        path = require('path'),
        // requires
        lookup = require('./lookup'),
        clone = require('./core/clone'),
        utils = require('./program-utils'),
        consts = require('./core/constants'),

        /**
         *
         * Return allowed types for help logs
         *
         */
        Templater = {

            /**
             *
             * Remove excluded files
             * from fs.readdir results
             * fs.readdir iterates on all .kiss directories
             * kiss module, home folder and current path folder
             *
             */
            _excludeFiles: function(files) {
                // files to excludes for templatings
                var value, indexof,
                    results = [].concat(files),
                    excludes = [].concat(consts.EXCLUDES);
                while (excludes.length) {
                    value = excludes.pop();
                    indexof = results.indexOf(value);
                    if (indexof >= 0) {
                        results.splice(indexof, 1);
                    }
                }
                return results;
            },

            /**
             *
             * Returns files in a .kiss folder
             *
             */
            _getfiles: function(currentpath, exitonerror) {
                var files = {};
                try {
                    files = fs.readdirSync(currentpath);
                    files = Templater._excludeFiles(files);
                    files = Templater._mapFilesToType(files, currentpath);
                } catch (e) {
                    if (exitonerror) {
                        utils.error('Unable to scan dir: ' + currentpath);
                    }
                    files = {};
                }
                return files;
            },

            /**
             *
             * Return an object
             * Keys are file basename
             * Will populate path for files
             *
             */
            _mapFilesToType: function(files, filepath) {
                var value,
                    results = {},
                    copy = [].concat(files);
                while (copy.length) {
                    value = copy.pop();
                    results[value.split(consts.DOT)[0]] = path.join(filepath, value);
                }
                return results;
            }
        };

    /**
     *
     * Returns a list a templates to use
     *
     */
    module.exports = function() {
        var files, currentpath,
            results = {};
        // iterates trough kiss module templates
        currentpath = path.join(consts.MODULE_PATH, consts.KISS_DIR);
        files = Templater._getfiles(currentpath, true);
        results = clone(results, files);

        // iterates through user home directory
        currentpath = utils.homeuser();
        currentpath = path.join(currentpath, consts.KISS_DIR);
        files = Templater._getfiles(currentpath);
        results = clone(results, files);

        // iterates trough current working directory templates
        currentpath = lookup(consts.KISS_DIR);
        files = Templater._getfiles(currentpath);
        results = clone(results, files);

        return results;
    };

}());
