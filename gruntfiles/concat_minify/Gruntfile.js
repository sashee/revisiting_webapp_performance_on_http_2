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
            }
        },
        uglify: { options: { mangle: false } },
        useminPrepare: {
            html: 'views/**/*.html',
            options:{
                root:'.',
                dest: 'dist'
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
        usemin:{
            html: 'dist/**/*.html',
            options:{
                assetsDirs:'dist'
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



    grunt.registerTask('default', [
        'clean:build',
        'useminPrepare',
        'copy:main',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'filerev',
        'usemin'
    ]);

};