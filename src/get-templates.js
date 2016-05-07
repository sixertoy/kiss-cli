(function () {

    'use strict';

    var fs = require('fs'),
        path = require('path'),
        assign = require('deep-assign'),
        // requires
        utils = require('./core/utils'),
        constants = require('./core/constants'),
        lookup = require('./lookup-project-folder'),

        /**
         *
         * Return allowed types for help logs
         *
         */
        Templates = {

            /**
             *
             * Remove excluded files
             * from fs.readdir results
             * fs.readdir iterates on all .kiss directories
             * kiss module, home folder and current path folder
             *
             */
            _excludeFiles: function (files) {
                // files to excludes for templatings
                var value, indexof,
                    excludes = [
                        // Windows
                        'Thumbs.db',
                        'ehthumbs.db',
                        'Desktop.ini',
                        // OSX
                        '.DS_Store',
                        '.AppleDouble',
                        '.LSOverride',
                        // Externals
                        '.Spotlight-V100',
                        '.Trashes'
                    ],
                    results = [].concat(files);
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
            _getfiles: function (currentpath, exitonerror) {
                var files = {};
                try {
                    files = fs.readdirSync(currentpath);
                    files = Templates._excludeFiles(files);
                    files = Templates._mapFilesToType(files, currentpath);
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
            _mapFilesToType: function (files, filepath) {
                var value,
                    results = {},
                    copy = [].concat(files);
                while (copy.length) {
                    value = copy.pop();
                    results[value.split(constants.DOT)[0]] = path.join(filepath, value);
                }
                return results;
            },

            /**
             *
             * Returns a list a templates to use
             *
             */
            getTemplates: function () {
                var files, currentpath,
                    results = {};
                // iterates trough kiss module templates
                currentpath = path.join(constants.MODULE_PATH, constants.KISS_DIR);
                files = Templates._getfiles(currentpath, true);
                results = assign(results, files);

                // iterates through user home directory
                currentpath = utils.homeuser();
                currentpath = path.join(currentpath, constants.KISS_DIR);
                files = Templates._getfiles(currentpath);
                results = assign(results, files);

                // iterates trough current working directory templates
                currentpath = lookup(constants.KISS_DIR);
                files = Templates._getfiles(currentpath);
                results = assign(results, files);

                return results;
            }


        };

    module.exports = Templates.getTemplates;

}());
