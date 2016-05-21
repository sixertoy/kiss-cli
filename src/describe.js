/* global require, module */
(function () {

    'use strict';

    var colors = require('./core/colors'),
        utils = require('./program-utils'),
        consts = require('./core/constants');

    /**
     *
     *
     *
     */
    module.exports = function (types) {
        // populate description for help log
        var key,
            desc = 'Filetypes:',
            home = utils.homeuser(),
            keys = Object.keys(types).sort();
        while (keys.length) {
            key = keys.shift();
            desc += consts.NEW_LINE + consts.TAB + key;
            key = types[key];
            if (key.indexOf(consts.CURRENT_WD) !== -1) {
                key = key.replace(consts.CURRENT_WD, consts.DOT);
            } else {
                key = key.replace(home, consts.TILDE);
            }
            desc += colors.green(consts.WHITESPACE + key);
        }
        desc += consts.NEW_LINE + consts.NEW_LINE;
        return desc;
    };

}());
