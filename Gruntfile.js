module.exports = function (grunt) {
    "use strict";

    var pkg  = grunt.file.readJSON("package.json"),
        date = new Date();

    grunt.initConfig({
        meta: {
            banner: '/*! ' + pkg.name + ' ' + pkg.version + ' | (c) ' + date.getFullYear() + ' ' + pkg.author + ' | ' + pkg.licenses[0].type + ' License */'
        },
        copy: {
            main: {
                src: 'src/svg/loading-spin.svg',
                dest: 'build/svg/loading-spin.svg',
            },
        },
        cssmin: {
            target: {
                files: {
                    'build/imgur.min.css': ['src/imgur.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
            },
            target: {
                files: {
                    'build/imgur.min.js': ['src/imgur.js']
                }
            }
        },
        watch: {
            css: {
                files: ['src/imgur.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['src/imgur.js'],
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'uglify', 'cssmin', 'copy' ]);
};
