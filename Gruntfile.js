var grunt = require('grunt');

grunt.initConfig({

    app: {
        name: 'TCX_-_ExampleContextApp',
        version: '1.0'
    },

    copy: {
        pui: {
            cwd: 'node_modules',
            src: [
                'primeui/primeui-ng-all.min.*',
                'primeng/**/*.js',
                'materialize-css/dist/js/*.min.js',
                'x2js/x2js.js'
            ],
            dest: '<%= app.name %>_v<%= app.version %>/ui/scripts',
            expand: true
        },
        main: {
            src: ['index.html'],
            dest: '<%= app.name %>_v<%= app.version %>/ui',
            expand: true
        },
        install: {
            src: ['install.json'],
            dest: '<%= app.name %>_v<%= app.version %>',
            expand: true
        },
        app: {
            cwd: 'app',
            src: ['**/*.html'],
            dest: '<%= app.name %>_v<%= app.version %>/ui/app',
            expand: true
        },
        resources: {
            cwd: 'app/resources',
            src: [
                '**/*.*',
                '!less/*.*',
                'ajax-loader-spinner.gif'
            ],
            dest: '<%= app.name %>_v<%= app.version %>/ui/app/resources',
            expand: true
        },
        images: {
            cwd: 'app/resources/images',
            src: [
                'ajax-loader-spinner.gif'
            ],
            dest: '<%= app.name %>_v<%= app.version %>/ui/app/resources/images',
            expand: true
        }
    },

    clean: {
        build: {
            src: ['<%= app.name %>_v<%= app.version %>'],
            options: {
                force: true
            }
        },
        cleanup: {
            src: [
                '<%= app.name %>_v<%= app.version %>/ui/app/**/*.js',
                '<%= app.name %>_v<%= app.version %>/ui/node_modules'
            ],
            options: {
                force: true
            }
        }
    },

    less: {
        app: {
            cwd: 'app/resources/less',
            dest: '<%= app.name %>_v<%= app.version %>/ui/app/resources/css',
            src: '*.less',
            ext: '.css',
            expand: true
        }
    },

    json_schema: {
        test: {
            options: {},
            files: {
                'tcex_json_schema.json': ['install.json']
            }
        }
    },

    watch: {
        main: {
            files: [
                'index.html',
                'styles.css'
            ],
            tasks: ['copy:main'],
            options: {
                livereload: false
            }
        },
        'app:scripts': {
            files: [
                'app/**/*.ts',
                'node_modules/spaces-ng/**/*',
                'node_modules/threatconnect-ng/**/*'
            ],
            tasks: [
                'tslint',
                'ts:app',
                'browserify:app'
            ],
            options: {
                livereload: false
            }
        },
        'app:less': {
            files: ['app/**/*.less'],
            tasks: ['less:app'],
            options: {
                livereload: false
            }
        },
        'app:markup': {
            files: ['app/**/*.html'],
            tasks: ['copy:app'],
            options: {
                livereload: false
            }
        },
        'app:resources': {
            files: ['app/resources/**/*.*'],
            tasks: ['copy:resources'],
            options: {
                livereload: false
            }
        }
    },

    ts: {
        app: {
            src: [
                'app/*.ts',
                'app/**/*.ts'
            ],
            outDir: '<%= app.name %>_v<%= app.version %>/ui/app',
            /*
            tsconfig: true
            options: {
                module: 'commonjs',
                target: 'es5',
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                sourceMap: false,
                declaration: false
            }
            */
            options: {
                declaration: true,
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                module: 'commonjs',
                moduleResolution: 'node',
                noImplicitAny: false,
                // outDir: 'dist',
                removeComments: false,
                rootDir: 'app',
                sourceMap: false,
                target: 'es5',
                typeRoots: [
                  'node_modules/@types'
                ],
                lib: [
                  'es2015',
                  'dom'
                ]
            }
        }
    },

    tslint: {
        options: {
            configuration: grunt.file.readJSON('tslint.json')
        },
        files: {
            src: ['app/**/*.ts']
        }
    },

    connect: {
        server: {
            options: {
                port: 9000,
                base: '<%= app.name %>_v<%= app.version %>/ui',
                livereload: false,
                open: true
            }
        }
    },

    browserify: {
        libs: {
            files: {
                '<%= app.name %>_v<%= app.version %>/ui/scripts/libs.js': [
                    'node_modules/es6-shim/es6-shim.min.js',
                    'node_modules/zone.js/dist/zone.js',
                    'node_modules/reflect-metadata/Reflect.js'
                ]
            }
        },
        app: {
            files: {
                '<%= app.name %>_v<%= app.version %>/ui/scripts/app.js': [
                    '<%= app.name %>_v<%= app.version %>/ui/app/main.js'
                ]
            }
        }
    },

    uglify: {
        libs: {
            src: '<%= app.name %>_v<%= app.version %>/ui/scripts/libs.js',
            dest: '<%= app.name %>_v<%= app.version %>/ui/scripts/libs.min.js'
        },
        app: {
            src: '<%= app.name %>_v<%= app.version %>/ui/scripts/app.js',
            dest: '<%= app.name %>_v<%= app.version %>/ui/scripts/app.min.js'
        }
    },

    compress: {
        main: {
            options: {
                archive: '<%= app.name %>_v<%= app.version %>.zip',
                pretty: true
            },
            expand: true,
            cwd: '<%= app.name %>_v<%= app.version %>/',
            src: ['**/*'],
            dest: '/<%= app.name %>_v<%= app.version %>/'
        }
    }
});

grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-include-replace');
grunt.loadNpmTasks('grunt-json-schema');
grunt.loadNpmTasks('grunt-ts');
grunt.loadNpmTasks('grunt-tslint');

grunt.registerTask(
    'build',
    'Compiles all assets and source files into build directory.',
    [
        'clean:build',
        'tslint',
        'less',
        'ts',
        'copy',
        'browserify',
        'clean:cleanup'
    ]
);

grunt.registerTask(
    'build:dist',
    [
        'json_schema',
        'build',
        'uglify',
        'compress'
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
    'build:watch',
    [
        'copy',
        'build',
        'watch'
    ]
);

grunt.registerTask(
    'serve',
    'Runs the build, then serves the project locally.',
    [
        'build:dist',
        'connect',
        'watch'
    ]
);