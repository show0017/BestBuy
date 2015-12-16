/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // This will minify all JS files
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['dist/js/*.js' ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.src %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        //these objects are safe to igonnore during the linting process
        globals: {
          "angular" : false,
          "console" : true,
          "cordova" : true,
          "window" : true,
          "StatusBar" : true
        },
        ignores:['dist/js/*.min.js'] //ignore vendor files that are already minified.
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src_js: {
        src: ['dist/js/*.js']
      },
    },
    //this will watch your files and then copy only teh valid linted version to your dist folder.
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src_js: {
        files: '<%= jshint.src_js.src %>',
        tasks: ['jshint:gruntfile', 'concat', 'uglify']
      },
    },
    //bower
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },
    //this will copy out only the min files to the www folder
    copy: {
      js: {
        src: ['www/lib/**/*.min.js','www/js/**/*.js'],
        dest: 'dist/js',
        expand: true, flatten: true
      },
      css: {
        src: 'www/lib/**/css/*',
        dest: 'dist/css',
        expand: true, flatten: true
      },
      fonts: {
        src: 'www/lib/**/fonts/*',
        dest: 'dist/fonts',
        expand: true, flatten: true
      },
      html:{
        src:['www/index.html', 'www/templates/**/*.html'],
        dest: 'dist/'
      }
    },
    cordovacli: {
      options: {
        cli: 'cordova'  // cca or cordova
      },
      cordova: {
        options: {
          command: ['build'],
          platforms: ['android', 'ios'],
          path: 'plugins'
        }
      },
    },
    clean: {
      js:["dist/js/*.js","!<%= uglify.dist.dest %>"],
      css:["dist/css/*.css","!dist/css/*.min.css"] 
    }    
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-cordovacli');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('default', [ 'copy','jshint', 'concat', 'uglify', 'clean' ]);
  //this is the release task
  grunt.registerTask('release', [ 'copy','jshint', 'concat', 'uglify', 'clean', 'cordovacli' ]);

};
