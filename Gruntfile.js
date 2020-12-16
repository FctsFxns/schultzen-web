module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    secret: grunt.file.readJSON('secret.json'),
    ftp_push: {
      deploy: {
        options: {
          host: "<%= secret.host %>",
          username: "<%= secret.username %>",
          password: "<%= secret.password %>",
          dest: "/web/",
          port: 21,
          incrementalUpdates: true,
          keepAlive: 120000
        },
        files: [
          {
            expand: true,
            cwd: '_site/',
            src: [
              "**/*"
            ]
          }
        ]
      }
    },
    sftp: {
      deploy: {
        files: {
          "./": "_site/**"
        },
        options: {
          srcBasePath: '_site/',
          createDirectories: true,
          host: "<%= secret.host %>",
          username: "<%= secret.username %>", 
          password: "<%= secret.password %>",
          path: "/web",
          showProgress: false
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // "_assets/css/main.css": "_less/main.less"
          "css/main.css": "_less/main.less"
        }
      }
    },
    concat: {
      css: {
        src: [
        '_css/*'
        ],
        dest: 'css/main.css'
      }
    },
    cssmin: {
      css: {
        src:  'css/main.css',
        dest: 'css/main.min.css'
      }
    },
    jekyll: {
      options: {
        src: '.',
        dest: './_site',
        config: '_config.yml',
        serve: false,
        watch: false,
        future: true,
        force_polling: false,
        bundleExec: true
      },
      devel: {
        options: {
          dest: './_site',
          config: '_config.yml',
          serve: true,
          watch: true,
          future: true,
          force_polling: true,
          bundleExec: true
        }
      },
      dist: {
        options: {
          dest: './_site',
          config: '_config.yml',
          serve: false,
          watch: false,
          future: true,
          force_polling: false,
          bundleExec: true
        }
      }
    },
    clean: {
      contents: ['./_site'],
      subfolders: ['./_site']
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: [
          '_less/*.less',
          '_less/partials/*.less'
          ],
        tasks: ['less', 'cssmin:css'],
      },
      html: {
        files: [
          '.htaccess',
          '*.png',
          '*.ico',
          '*.txt',
          '*.xml',
          '*.html',
          '*.md',
          '_config.yml',
          '_assets/js/*',
          '_assets/stylesheets/*',
          'css/*.css',
          '_includes/*.html',
          '_layouts/*.html',
          '_includes/components/*',
          '_includes/*',
          '_posts/*',
          '_works/*',
          '_pages/*',
          'media/*',
          'media/images/*',
          'media/pdf/*',
          '_data/*'
          ],
        tasks: ['jekyll:dist'],
        options: {
          spawn: false,
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: './_site',
          open: {
            target: 'http://localhost:8000'
          }
        }
      }
    }
  });
  require('load-grunt-tasks')(grunt);

  // Deployment with secure ftp https://github.com/israelroldan/grunt-ssh
  grunt.loadNpmTasks('grunt-ssh');
  // Deployment with insecure ftp https://www.npmjs.com/package/grunt-ftp-push
  grunt.loadNpmTasks('grunt-ftp-push');

  grunt.loadNpmTasks('grunt-contrib-clean');


  // grunt.registerTask('default', ['less', 'concat:css', 'cssmin:css', 'jekyll']);
  // grunt.registerTask('css', ['less', 'concat:css', 'cssmin:css']);

  // Only compile the custom less->css for Christina's site theme
  // Using grunt 'grunt-contrib-less' + 'grunt-contrib-cssmin'
  // resulting on -> css/main.min.css
  grunt.registerTask('css', ['less', 'cssmin:css']);

  // Build the full site
  // Less -> sass + js -> jekyll -> _dist
  grunt.registerTask('build', ['clean','less','cssmin:css','jekyll:dist']);

  // Watch for content creation serving from jekyll
  // "_assets" asset pipeline will work: js + sass
  // "_less"   asset pipeline will NOT work: less
  grunt.registerTask('content', ['clean','less','cssmin:css','jekyll:devel']);

  // Server option: tails connect + watch
  // "_assets" + "_less" asset pipeline will both work:
  // [js + sass] + [less]
  grunt.registerTask('theming', ['build','connect', 'watch']);

  // Watch for content and forget about the rest
  grunt.registerTask('default', ['theming']);


  // Build + deploy the full site
  // Less -> sass + js -> jekyll -> _dist

  // grunt sftp:deploy --config production
  grunt.registerTask('deployold', ['sftp:deploy']);

  // grunt ftp_push:deploy
  grunt.registerTask('deploy', ['build', 'ftp_push:deploy']);


};
