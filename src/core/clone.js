/* global require, module */
(function () {

    'use strict';

    var programUtils = require('./../program-utils');

    module.exports = function (target) {
        var output, src, i, key, len,
            valid = arguments.length >= 2;
        if (!valid) {
            programUtils.exit('Cannot convert undefined or null to object');
        }
        function __assign__(source, tgt) {
            for (key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    tgt[key] = source[key];
                }
            }
        }
        output = target;
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
