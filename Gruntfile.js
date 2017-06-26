var buildConfig = require('./config/build.config.js');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-cache-breaker');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-run');

  var taskConfig = {
    browserify: {
      app: {
        options: {
          transform: [['babelify', {presets: ['es2015', 'react']}]]
        },
        src: ['src/app/main.js'],
        dest: 'build/js/bundle.js'
      },

      tests: {
        options: {
          transform: [['babelify', {presets: ['es2015', 'react'], plugins: ['transform-object-rest-spread']}]],
          external: ['react/addons', 'react/lib/ReactContext', 'react/lib/ExecutionEnvironment']
        },
        src: ['test/AppSpec.js'],
        dest: '<%= test_dir %>/js/bundle.js'
      },

      watch: {
        options: {
          transform: [['babelify', {presets: ['es2015', 'react']}]],
          watch: true,
          keepAlive: true,
          watchifyOptions: {
            poll: 1000
          }
        },
        src: ['src/app/main.js'],
        dest: 'build/js/bundle.js'
      },

      watchTest: {
        options: {
          transform: [['babelify', {presets: ['es2015', 'react'], plugins: ['transform-object-rest-spread']}]],
          external: ['react/addons', 'react/lib/ReactContext', 'react/lib/ExecutionEnvironment'],
          watch: true,
          keepAlive: true,
          watchifyOptions: {
            poll: 1000
          }
        },
        src: ['test/AppSpec.js'],
        dest: '<%= test_dir %>/js/bundle.js'
      }
    },

    cachebreaker: {
      dev: {
        options: {
          match: [
            {
              'bundle.js' : 'build/js/bundle.js',
              'main.css' : 'build/css/main.css'
            }
          ],
          replacement: 'md5',

        },
        files: {
          src: ['build/index.tpl.html']
        }
      }
    },

    clean: {
          build: '<%= build_dir %>',
          tests: '<%= test_dir %>'
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb',  // css_dir = 'dev/css'
          cssDir: 'build/css'
        }
      }
    },

    copy: {
      build_images: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= build_dir %>/images/',
            cwd: 'src/assets/images',
            expand: true
          }
        ]
      },
      build_fonts: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= build_dir %>/fonts/',
            cwd: 'src/assets/fonts',
            expand: true
          }
        ]
      },

      build_html: {
        files: [
          {
            flatten: true,
            src: '<%= app_files.html %>',
            dest: '<%= build_dir %>',
            expand : true
          }
        ]
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      start: ['browserify:watch', 'browserify:watchTest', ['watch:sources', 'cachebreaker'], 'run:server']
    },

    mochaTest: {
      options: {
        require: [
          'mock-local-storage',
          'jsdom-global/register',
          'test/globals.js'
        ],
        clearRequireCache: true
      },
      src: '<%= test_dir %>/js/bundle.js'
    },

    run: {
      server: {
        cmd: 'node',
        args: ['server.js']
      }
    },

    uglify: {
      bundle: {
        files: [{
          src : ['build/js/bundle.js'],
          dest:'build/js/bundle.js'
        }]
      }
    },

    watch: {
      sources: {
        options: {
          spawn: false
        },
        files: ['build/js/bundle.js','test-build/js/bundle.js','<%= app_files.sass %>'],
        tasks: ['compass', 'mochaTest']
      }
    }
  };

  grunt.initConfig(grunt.util._.extend({
      pkg: grunt.file.readJSON('package.json')
    },
    taskConfig,
    buildConfig
  ));

  grunt.registerTask('default', ['startAndWatch']);

  grunt.registerTask('watchJs', ['config:dev', 'env:dev', 'build', 'browserify:watch']);

  grunt.registerTask('startAndWatch', ['build', 'concurrent:start']);

  grunt.registerTask('build', ['clean', 'compass', 'copy', 'browserify:app']);

  grunt.registerTask('test', ['clean:tests', 'browserify:tests', 'mochaTest']);

  grunt.registerTask('prod', ['build', 'uglify', 'cachebreaker']);

};
