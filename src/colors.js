/* global module */
(function () {

    'use strict';

    var colors = {
        __getColor: function (msg, code) {
            return '\u001b[' + code + 'm' + msg + '\u001b[39m';
        },
        red: function (msg) {
            return colors.__getColor(msg, 31);
        },
        gray: function (msg) {
            return colors.__getColor(msg, 90);
        },
        grey: function (msg) {
            return this.gray(msg);
        },
        blue: function (msg) {
            return colors.__getColor(msg, 34);
        },
        cyan: function (msg) {
            return colors.__getColor(msg, 36);
        },
        green: function (msg) {
            return colors.__getColor(msg, 32);
        },
        white: function (msg) {
            return colors.__getColor(msg, 37);
        },
        yellow: function (msg) {
            return colors.__getColor(msg, 33);
        },
        magenta: function (msg) {
            return colors.__getColor(msg, 35);
        }
    };

    module.exports = colors;

}());
