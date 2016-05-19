module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        expand: true,
        cwd: 'src/js/',
        src: '**/*',
        dest:'dist/js/'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/js/*.js'
      ]
    },
	cssmin: {
      options: {
        report: 'gzip'
      },
      build: {
		files: {		
			'dist/css/<%= pkg.name %>.min.css':'src/css/<%=pkg.name %>.css'
		}
      }
	},
    concat: {
      options: {
        separator: '',
        stripBanners: true
      },
      css:{
        src: [
          'dist/css/*.css'
        ],
        dest: 'dist/css/<%=pkg.name %>.all.css'
      },
      js:{
        src: [
          'dist/js/*.js'
        ],
        dest: 'dist/js/<%=pkg.name %>.all.js'
      }
	},
    copy: {
      img: {
        expand: true,
        cwd: 'src/img/',
        src: '**/*',
        dest:'dist/img/'
      },
      chrome: {
        expand: true,
        cwd: 'src/chrome-app/',
        src: '**/*',
        dest:'dist/'
      },
	  components: {
		expand: true,
        cwd: 'bower_components/',
		src: [
		'jquery/dist/jquery.min.js',
		'bootstrap/dist/js/bootstrap.min.js',
		'bootstrap/dist/css/bootstrap.min.css',
		'bootstrap/dist/fonts/**',
		'bootstrap-markdown/css/bootstrap-markdown.min.css',
		'bootstrap-markdown/js/bootstrap-markdown.js',
		'bootstrap-markdown/locale/bootstrap-markdown.zh.js',
		'showdown/dist/showdown.min.js'],
		dest: "dist/components/"
	  }
	},
    clean: ['dist'],
    dotpl: require('./localization')(grunt)
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint','clean','uglify','cssmin','concat','copy','dotpl']);
};