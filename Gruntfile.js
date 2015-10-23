module.exports = function (grunt) {

    // configure
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            client: [
                'Gruntfile.js'
            ],
        },

        reactify: {
            'src/main/resources/webapp/js': 'jsx/*.js'
        },

        watch: {
            files: 'jsx/*.js',
            tasks: ['reactify']
        }
    });

    // load
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-reactify');

    // register
    grunt.registerTask('default', ['jshint', 'reactify', 'watch']);
};
