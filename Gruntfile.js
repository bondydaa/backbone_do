module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      compass: {
        files: ['app/src/*.scss'],
        tasks: ['compass:dist']
      },
      concat: {
        files: ['app/js/models/*.js', 'app/js/collections/*.js', 'app/js/views/*.js', 'app/js/router/*.js', 'app/js/inits.js'],
        tasks: ['concat:dist']
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'app/src',
        cssDir: 'app/css',
        imagesDir: 'app/img',
        javascriptsDir: 'app/js',
        fontsDir: 'app/fonts',
        httpImagesPath: 'app/images',
        httpFontsPath: 'app/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        outputStyle: 'nested',
        noLineComments: false
      },
      dist: {
        options: {
          noLineComments: false
        }
      }
    },

    concat: {
      options: {
        separator: grunt.util.linefeed + grunt.util.linefeed,
        banner: '(function ($, global) {' + grunt.util.linefeed + '$(document).ready(function(){' + grunt.util.linefeed + grunt.util.linefeed,
        footer: grunt.util.linefeed + grunt.util.linefeed + '});' + grunt.util.linefeed +  '})(jQuery, this);'
      },
      dist: {
        src: ['app/js/models/*.js', 'app/js/collections/*.js', 'app/js/views/*.js', 'app/js/router/*.js', 'app/js/inits.js'],
        dest: 'app/js/main.js'
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', [
    'compass',
    'concat'
  ]);

};