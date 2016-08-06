/* global module */
/**
 * <project_name>
 * <project_repo>
 *
 * Copyright (c) <year> <username>
 * Licensed under the MIT license.
 *
 */
module.exports = function(grunt) {

    'use strict';

    // npm i -D grunt load-grunt-config
    // require('load-grunt-config')(grunt);

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint']);

};
