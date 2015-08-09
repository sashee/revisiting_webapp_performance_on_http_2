module.exports = function(grunt) {

    grunt.initConfig({
        clean: {
            build: {
                src: ["dist"]
            }
        },
        copy: {
            main: {
                src: ['**/*.html'],
                dest: 'dist/',
                expand : true,
                cwd: 'views/'
            },
            css: {
                src: ['libs/*.css'],
                dest: 'dist',
                expand : true,
                cwd: '.'
            }
        },
        uglify:{
            js: {
                files: [{
                    expand: true,
                    cwd: 'libs',
                    src: '**/*.js',
                    dest: 'dist/libs'
                }]
            }
        },
        filerev:{
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            source: {
                files: [{
                    src: [
                        'dist/**/*.js',
                        'dist/**/*.css'
                    ]
                }]
            }
        },
        filerev_replace: {
            options: {
                assets_root: 'dist'
            },
            compiled_assets: {
                src: 'dist/*.{css,js}'
            },
            views: {
                src: 'dist/**/*.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-filerev-replace');



    grunt.registerTask('default', [
        'clean:build',
        'uglify:js',
        'copy:main',
        'copy:css',
        'filerev',
        'filerev_replace'
    ]);
};