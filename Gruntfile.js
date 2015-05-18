module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'dist/angular-validate.min.js': ['src/angular-validate.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dist', ['uglify:dist']);
};
