module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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


  // grunt.registerTask('default', ['less', 'concat:css', 'cssmin:css', 'jekyll']);
  // grunt.registerTask('css', ['less', 'concat:css', 'cssmin:css']);

  // Only compile the custom less->css for Christina's site theme
  // Using grunt 'grunt-contrib-less' + 'grunt-contrib-cssmin'
  // resulting on -> css/main.min.css 
  grunt.registerTask('css', ['less', 'cssmin:css']);
  
  // Build the full site
  // Less -> sass + js -> jekyll -> _dist
  grunt.registerTask('build', ['less', 'cssmin:css', 'jekyll:dist']);

  // Watch for content creation serving from jekyll
  // "_assets" asset pipeline will work: js + sass
  // "_less"   asset pipeline will NOT work: less
  grunt.registerTask('content', ['jekyll:devel']);

  // Server option: tails connect + watch
  // "_assets" + "_less" asset pipeline will both work: 
  // [js + sass] + [less]
  grunt.registerTask('theming', ['connect', 'watch']);

  // Watch for content and forget about the rest
  grunt.registerTask('default', ['theming']);


};