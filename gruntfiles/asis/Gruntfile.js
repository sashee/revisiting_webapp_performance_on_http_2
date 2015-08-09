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
            dev: {
                src: ['libs/**/*.*'],
                dest: 'dist/',
                expand: true
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
        'copy:main',
        'copy:dev'
    ]);

};