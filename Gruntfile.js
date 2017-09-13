var grunt = require('grunt');
var path = require('path');
grunt.initConfig({
  app: {
    name: 'TCX_-_ExampleContextApp',
    version: '1.0'
  },

  copy: {
    main: {
      cwd: 'dist/',
      src: ['**', '!*.eot', '!*.svg', '!*.ttf', '!*.woff'],
      dest: 'target/<%= app.name %>_v<%= app.version %>/ui/',
      expand: true
    },
    app: {
      src: 'install.json',
      dest: 'target/<%= app.name %>_v<%= app.version %>',
      expand: true
    }
  },

  clean: {
    bundle: {
      src: [
        'target/'
      ],
      options: {
        expand: true
      }
    },
    build: {
      src: ['dist'],
      options: {
        expand: true
      }
    }
  },

  exec: {
    buildProd: path.relative('', 'node_modules/.bin/ng build') +  ' --aot --prod --base-href .',
    buildDev: path.relative('', 'node_modules/.bin/ng build') +  ' --aot',
    serve: path.relative('', 'node_modules/.bin/ng serve')
  },


  tslint: {
    options: {
      configuration: grunt.file.readJSON('tslint.json')
    },
    files: {
      src: ['app/**/*.ts']
    }
  },

  compress: {
    main: {
      options: {
        archive: 'target/<%= app.name %>_v<%= app.version %>.tcx',
        pretty: true,
        mode: 'zip'
      },
      expand: true,
      cwd: 'target/<%= app.name %>_v<%= app.version %>/',
      src: ['**/*'],
      dest: '/<%= app.name %>_v<%= app.version %>/'
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-tslint');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-exec');

grunt.registerTask(
  'buildProd',
  'Compiles all assets and source files into build directory.',
  [
    'clean',
    'exec:buildProd',
    'copy',
    'compress',
    'clean:build'
  ]
);

grunt.registerTask(
  'buildDev',
  'Compiles all assets and source files into build directory.',
  [
    'clean',
    'exec:buildDev'
  ]
);

grunt.registerTask(
  'build:serve',
  [
    'copy',
    'build',
    'connect',
    'watch'
  ]
);

grunt.registerTask(
  'serve',
  'Runs the build, then serves the project locally.',
  [
    'exec:serve'
  ]
);

grunt.registerTask(
  'default',
  'Run default build',
  [
    'buildProd'
  ]
);
