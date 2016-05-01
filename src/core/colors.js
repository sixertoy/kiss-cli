/* global module */
(function () {

    'use strict';

    var colors = {

        RED: 31,
        GREEN: 32,
        YELLOW: 33,
        BLUE: 34,
        MAGENTA: 35,
        CYAN: 36,
        WHITE: 37,
        GRAY: 90,

        __getColor: function (msg, code) {
            return '\u001b[' + code + 'm' + msg + '\u001b[39m';
        },
        red: function (msg) {
            return colors.__getColor(msg, colors.RED);
        },
        gray: function (msg) {
            return colors.__getColor(msg, colors.GRAY);
        },
        grey: function (msg) {
            // alias of gray
            return this.gray(msg);
        },
        blue: function (msg) {
            return colors.__getColor(msg, colors.BLUE);
        },
        cyan: function (msg) {
            return colors.__getColor(msg, colors.CYAN);
        },
        green: function (msg) {
            return colors.__getColor(msg, colors.GREEN);
        },
        white: function (msg) {
            return colors.__getColor(msg, colors.WHITE);
        },
        yellow: function (msg) {
            return colors.__getColor(msg, colors.YELLOW);
        },
        magenta: function (msg) {
            return colors.__getColor(msg, colors.MAGENTA);
        }
    };

    module.exports = colors;

}());
