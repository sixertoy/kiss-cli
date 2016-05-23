/* global require, module */
(function () {

    'use strict';

    var utils = require('./../program-utils');

    module.exports = function () {
        var output, src, i, key, len,
            valid = arguments.length >= 1;
        if (!valid) {
            utils.exit('Cannot convert undefined or null to object');
        }
        function __assign__(source, tgt) {
            for (key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    tgt[key] = source[key];
                }
            }
        }
        output = {};
        len = arguments.length;
        for (i = 1; i < len; i++) {
            src = arguments[i];
            if (src) {
                __assign__(src, output);
            }
        }
        return output;
    };

}());
