/* global require, module */
(function () {

    'use strict';

    var utils = require('./core/utils'),
        colors = require('./core/colors'),
        constants = require('./core/constants'),

        /**
         *
         *
         *
         */
        Describe = function (types) {
            // populate description for help log
            var key,
                desc = 'Filetypes',
                home = utils.homeuser(),
                keys = Object.keys(types).sort();
            while (keys.length) {
                key = keys.shift();
                desc += constants.NEW_LINE + constants.TAB + key;
                key = types[key];
                if (key.indexOf(constants.CURRENT_WD) !== -1) {
                    key = key.replace(constants.CURRENT_WD, constants.DOT);
                } else {
                    key = key.replace(home, constants.TILDE);
                }
                desc += colors.green(constants.WHITESPACE + key);
            }
            return desc;
        };

    module.exports = Describe;

}());
