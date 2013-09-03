/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 2:03 PM
 * File: Gruntfile.js
 */

'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var path = require('path');
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};


module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'src',
        dist: 'build',
        stage: '.tmp'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/styles/{,**/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,**/}*.html',
                    '{<%= yeoman.stage %>,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{<%= yeoman.stage %>,<%= yeoman.app %>}/app/{,**/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, yeomanConfig.stage)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.stage)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            options: {
                dot: true
            },
            local: {
                files: [{
                    src: [
                        '<%= yeoman.stage %>'
                    ]
                }]
            },
            demo: {
                files: [{
                    src: [
                        '<%= yeoman.stage %>',
                        '<%= yeoman.dist %>/demo/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            prod: {
                files: [{
                    src: [
                        '<%= yeoman.stage %>',
                        '<%= yeoman.dist %>/prod/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            dev: {
                files: [{
                    src: [
                        '<%= yeoman.stage %>',
                        '<%= yeoman.dist %>/dev/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            template: {
                files: [{
                    src: [
                        '<%= yeoman.stage %>/*.template'
                    ]
                }]
            }
//            dist: ['./tmp', './dist'],
//            buildDemo: ['./tmp', './build/demo'],
//            buildProd: ['./tmp', './build/prod'],
//            buildDev: ['./tmp', './build/dev'],
//            temp: './tmp',
//            images: './dist/img'
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '<%= yeoman.stage %>/styles',
                imagesDir: '<%= yeoman.app %>/img',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                javascriptsDir: '<%= yeoman.app %>/app',
                importPath: '<%= yeoman.app %>/components',
                relativeAssets: true
            },
            prod: {
                options: {
                    debugInfo: false,
                    outputStyle: 'compressed'
                }
            },
            dev: {
                options: {
                    debugInfo: true,
                    outputStyle: 'expanded'
                }
            }
        },
        // Copies directories and files from one location to another.
        copy: {
            // Copies libs and img directories to temp.
            local: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.stage %>',
                    src: [
                        'app/**/*',
                        'components/**/*',
                        'core/**/*',
                        'img/**/*',
                        '*.html*'
                    ]
                }]
            },
            /*
             Copies the contents of the temp directory to the dist directory.
             In 'dev' individual files are used.
             */
            dev: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: './',
                        dest: '<%= yeoman.dist %>/dev',
                        src: [
                            '<%= yeoman.app %>/*.{ico,txt}',
                            '<%= yeoman.app %>/img/{,*/}*.{gif,webp}',
                            '<%= yeoman.app %>/styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        flatten: true,
                        cwd: './',
                        dest: '<%= yeoman.dist %>/dev/scripts',
                        src: [
                            '<%= yeoman.stage %>/scripts/scripts.js'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        flatten: true,
                        cwd: './',
                        dest: '<%= yeoman.dist %>/dev/styles',
                        src: [
                            '<%= yeoman.stage %>/styles/main.css'
                        ]
                    }
                ]
            },
            demo: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: './',
                        dest: '<%= yeoman.dist %>/demo',
                        src: [
                            '<%= yeoman.app %>/*.{ico,txt}',
                            '<%= yeoman.app %>/img/{,*/}*.{gif,webp}',
                            '<%= yeoman.app %>/styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        flatten: true,
                        cwd: './',
                        dest: '<%= yeoman.dist %>/demo/scripts',
                        src: [
                            '<%= yeoman.stage %>/scripts/scripts.js'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        flatten: true,
                        cwd: './',
                        dest: '<%= yeoman.dist %>/demo/styles',
                        src: [
                            '<%= yeoman.stage %>/styles/main.css'
                        ]
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: './',
                        dest: '<%= yeoman.dist %>/prod',
                        src: [
                            '<%= yeoman.app %>/*.{ico,txt}',
                            '<%= yeoman.app %>/img/{,*/}*.{gif,webp}',
                            '<%= yeoman.app %>/styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        flatten: true,
                        cwd: './',
                        dest: '<%= yeoman.dist %>/prod/scripts',
                        src: [
                            '<%= yeoman.stage %>/scripts/scripts.js'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        flatten: true,
                        cwd: './',
                        dest: '<%= yeoman.dist %>/prod/styles',
                        src: [
                            '<%= yeoman.stage %>/styles/main.css'
                        ]
                    }
                ]
            },
            /*
             Copies select files from the temp directory to the dev directory.
             Dev is deployed to subtree dev for remote testing
             */
            buildDev: {
                files: [
                    {expand: true, cwd: './tmp/', src: [
                        'scripts/scripts.dev.js',
                        'styles/main.css',
                        'img/**',
                        'components/**',
                        '**/*.html'
                    ], dest: './build/dev/'}
                ]
            },
            buildDemo: {
                files: [
                    {expand: true, cwd: './tmp/', src: [
                        'scripts/scripts.demo.js',
                        'styles/main.css',
                        'img/**',
                        'components/**',
                        '**/*.html'
                    ], dest: './build/demo/'}
                ]
            },
            buildProd: {
                files: [
                    {expand: true, cwd: './tmp/', src: [
                        'scripts/scripts.min.js',
                        'styles/main.css',
                        'img/**',
                        'components/**',
                        '**/*.html'
                    ], dest: './build/prod/'}
                ]
            },
            // Task is run when a watched script is modified.
            appjs: {
                files: [
                    {expand: true, cwd: './src/', src: ['app/**/*.js'], dest: './dist/'}
                ]
            },
            apphtml: {
                files: [
                    {expand: true, cwd: './src/', src: ['app/**/*.html'], dest: './dist/'}
                ]
            },
            core: {
                files: [
                    {expand: true, cwd: './src/', src: ['core/**'], dest: './dist/'}
                ]
            },
            // Task is run when a watched style is modified.
            styles: {
                files: [
                    {expand: true, cwd: './tmp/', src: ['styles/main.css'], dest: './dist/'}
                ]
            },
            // Task is run when an image is modified.
            images: {
                files: [
                    {expand: true, cwd: './src/', src: ['img/**'], dest: './dist/'}
                ]
            },
            // Task is run when a template is modified.
            template: {
                files: [
                    {expand: true, cwd: './src/', src: ['template/**'], dest: './dist/'}
                ]
            },
            index: {
                files: [
                    {expand: true, cwd: './tmp/', src: ['index.html'], dest: './dist/'}
                ]
            }
        },
        concat: {
            demo: {
                'src': [
                    '<%= yeoman.stage %>/app/**/*.js',
                    '<%= yeoman.stage %>/core/**/*.js',
                    '<%= yeoman.stage %>/components/**/*.js',
                    '!<%= yeoman.stage %>/app/**/*.unit.js',
                    '!<%= yeoman.stage %>/app/**/*.e2e.js'
                ],
                dest: '<%= yeoman.dist %>/demo/scripts/scripts.js'
            },
            mock: {
                src: [
                    '<%= yeoman.dist %>/demo/scripts/scripts.js',
                    '<%= yeoman.app %>/components/angular-mocks/angular-mocks.js',
                    '<%= yeoman.app %>/app/mock.js'
                ],
                dest: '<%= yeoman.dist %>/demo/scripts/scripts.js'
            }
//            demo2: {
//                src: [
//                    './tmp/scripts/scripts.min.js',
//                    './tmp/components/angular-mocks/angular-mocks.js',
//                    './tmp/app/mock.js'
//                ],
//                dest: './tmp/scripts/scripts.demo.js'
//            }
        },

        /*
         RequireJS optimizer configuration for both scripts and styles.
         This configuration is only used in the 'prod' build.
         The optimizer will scan the main file, walk the dependency tree, and write the output in dependent sequence to a single file.
         Since RequireJS is not being used outside of the main file or for dependency resolution (this is handled by AngularJS), RequireJS is not needed for final output and is excluded.
         RequireJS is still used for the 'dev' build.
         The main file is used only to establish the proper loading sequence.
         */
        requirejs: {
            dev: {
                options: {
                    baseUrl: './tmp/',
                    findNestedDependencies: true,
                    logLevel: 0,
                    mainConfigFile: './tmp/main.js',
                    name: 'main',
                    // Exclude main from the final output to avoid the dependency on RequireJS at runtime.
                    onBuildWrite: function (moduleName, path, contents) {
                        var modulesToExclude = ['main'],
                            shouldExcludeModule = modulesToExclude.indexOf(moduleName) >= 0;

                        if (shouldExcludeModule) {
                            return '';
                        }

                        return contents;
                    },
                    out: './tmp/scripts/scripts.dev.js',
                    preserveLicenseComments: false,
                    skipModuleInsertion: true,
                    optimize: 'none'
                }
            },
            prod: {
                options: {
                    baseUrl: './tmp/',
                    findNestedDependencies: true,
                    logLevel: 0,
                    mainConfigFile: './tmp/main.js',
                    name: 'main',
                    // Exclude main from the final output to avoid the dependency on RequireJS at runtime.
                    onBuildWrite: function (moduleName, path, contents) {
                        var modulesToExclude = ['main'],
                            shouldExcludeModule = modulesToExclude.indexOf(moduleName) >= 0;

                        if (shouldExcludeModule) {
                            return '';
                        }

                        return contents;
                    },
                    optimize: 'uglify',
                    out: './tmp/scripts/scripts.min.js',
                    preserveLicenseComments: false,
                    skipModuleInsertion: true,
                    uglify: {
                        // Let uglifier replace variables to further reduce file size.
                        no_mangle: true
                    }
                }
            }
        },

        /*
         Compile template files (.template) to HTML (.html).

         .template files are essentially html; however, you can take advantage of features provided by grunt such as underscore templating.

         The example below demonstrates the use of the environment configuration setting.
         In 'prod' the concatenated and minified scripts are used along with a QueryString parameter of the hash of the file contents to address browser caching.
         In environments other than 'prod' the individual files are used and loaded with RequireJS.

         <% if (config.environment === 'prod') { %>
         <script src="/scripts/scripts.min.js?v=<%= config.hash('./temp/scripts/scripts.min.js') %>"></script>
         <% } else { %>
         <script data-main="/scripts/main.js" src="/scripts/libs/require.js"></script>
         <% } %>
         */
        template: {
            local: {
                files: {
                    '.tmp/main.js': './src/main.js.template',
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'local'
            },
            localDev: {
                files: {
                    '.tmp/main.js': './src/main.js.template',
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'localDev'
            },
            demo: {
                files: {
                    '.tmp/main.js': './src/main.js.template',
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'demo'

            },
            dev: {
                files: {
                    '.tmp/main.js': './src/main.js.template',
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'dev'
            },
            prod: {
                files: {
                    '.tmp/main.js': './src/main.js.template',
                    '.tmp/index.html': './src/index.html.template'
                },
                environment: 'prod'
            },
            shimDev: {
                files: {
                    './tmp/main.js': './src/main.js.template'
                },
                environment: 'dev'
            },
            shimLocalDev: {
                files: {
                    './tmp/main.js': './src/main.js.template'
                },
                environment: 'localDev'
            },
            shimDemo: {
                files: {
                    './tmp/main.js': './src/main.js.template'
                },
                environment: 'demo'
            },
            shimProd: {
                files: {
                    './tmp/main.js': './src/main.js.template'
                },
                environment: 'prod'
            },
            shimLocal: {
                files: {
                    './tmp/main.js': './src/main.js.template'
                },
                environment: 'local'
            },
            indexLocal: {
                files: {
                    './tmp/index.html': './src/index.html.template'
                },
                environment: 'local'
            },
            indexLocalDev: {
                files: {
                    './tmp/index.html': './src/index.html.template'
                },
                environment: 'localDev'
            },
            indexDev: {
                files: {
                    './tmp/index.html': './src/index.html.template'
                },
                environment: 'dev'
            },
            indexProd: {
                files: {
                    './tmp/index.html': './src/index.html.template'
                },
                environment: 'prod'
            },
            indexDemo: {
                files: {
                    './tmp/index.html': './src/index.html.template'
                },
                environment: 'demo'
            }
        },
        rev: {
            demo: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/demo/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/demo/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/demo/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/demo/styles/fonts/*'
                    ]
                }
            },
            dev: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/dev/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/dev/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/dev/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/dev/styles/fonts/*'
                    ]
                }
            },
            prod: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/prod/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/prod/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/prod/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/prod/styles/fonts/*'
                    ]
                }
            }
        },
        express: {
            livereload: {
                options: {
                    port: 9000,
                    bases: path.resolve('/.tmp'),
                    debug: true,
                    monitor: {},
                    server: path.resolve('./server')
                }
            }
        },
        jshint: {
            options: {
                jshintrc: 'config/.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/app/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'config/karma-unit.conf.js',
                singleRun: true
            },
            e2e: {
                configFile: 'config/karma-e2e.conf.js',
                singleRun: true
            }
        },
        useminPrepare: {
            html: '<%= yeoman.stage %>/index.html',
            css: '<%= yeoman.stage %>/styles/main.css'
//            options: {
//                dest:
//                    '<%= yeoman.dist %>/demo'
//                    '<%= yeoman.dist %>/dev',
//                    '<%= yeoman.dist %>/prod'
//            }
        },
        usemin: {
            html: [
                '<%= yeoman.dist %>/demo/{,*/}*.html',
                '<%= yeoman.dist %>/dev/{,*/}*.html',
                '<%= yeoman.dist %>/prod/{,*/}*.html'
            ],
            css: [
                '<%= yeoman.dist %>/demo/styles/{,*/}*.css',
                '<%= yeoman.dist %>/dev/styles/{,*/}*.css',
                '<%= yeoman.dist %>/prod/styles/{,*/}*.css'
            ],
            options: {
                dirs: [
                    '<%= yeoman.dist %>/demo',
                    '<%= yeoman.dist %>/dev',
                    '<%= yeoman.dist %>/prod'
                ]
            }
        },
        imagemin: {
            demo: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/demo/img'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/dev/img'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/prod/img'
                }]
            }
        },
        cssmin: {
            demo: {
                files: {
                    '<%= yeoman.dist %>/demo/styles/main.css': [
                        '<%= yeoman.dist %>/demo/styles/main.css'
                    ]
                }
            },
            dev: {
                files: {
                    '<%= yeoman.dist %>/dev/styles/main.css': [
                        '<%= yeoman.dist %>/dev/styles/main.css'
                    ]
                }
            },
            prod: {
                files: {
                    '<%= yeoman.dist %>/prod/styles/main.css': [
                        '<%= yeoman.dist %>/prod/styles/main.css'
                    ]
                }
            }
        },
        htmlmin: {
            options: {
                /*removeCommentsFromCDATA: true,
                 // https://github.com/yeoman/grunt-usemin/issues/44
                 //collapseWhitespace: true,
                 collapseBooleanAttributes: true,
                 removeAttributeQuotes: true,
                 removeRedundantAttributes: true,
                 useShortDoctype: true,
                 removeEmptyAttributes: true,
                 removeOptionalTags: true*/
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', 'app/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            },
            stageDemo: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.stage %>',
                    src: [
                        '*.html'
                    ],
                    dest: '<%= yeoman.dist%>/demo'
                }]
            },
            demo: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: [
                            'app/**/*.html',
                            'template/**/*.html',
                            '!components/**/*.html'
                        ],
                        dest: '<%= yeoman.dist%>/demo'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.stage %>',
                        src: [
                            '*.html'
                        ],
                        dest: '<%= yeoman.dist%>/demo'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: [
                            'app/**/*.html',
                            'template/**/*.html',
                            '!components/**/*.html'
                        ],
                        dest: '<%= yeoman.dist%>/dev'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.stage %>',
                        src: [
                            '*.html'
                        ],
                        dest: '<%= yeoman.dist%>/dev'
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: [
                            'app/**/*.html',
                            'template/**/*.html',
                            '!components/**/*.html'
                        ],
                        dest: '<%= yeoman.dist%>/prod'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.stage %>',
                        src: [
                            '*.html'
                        ],
                        dest: '<%= yeoman.dist%>/prod'
                    }
                ]
            }
        },
        ngmin: {
            demo: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/demo/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/demo/scripts'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/dev/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/dev/scripts'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/prod/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/prod/scripts'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            demo: {
                files: {
                    '<%= yeoman.dist %>/demo/scripts/scripts.js': [
                        '<%= yeoman.dist %>/demo/scripts/scripts.js'
                    ]
                }
            },
            dev: {
                files: {
                    '<%= yeoman.dist %>/dev/scripts/scripts.js': [
                        '<%= yeoman.dist %>/dev/scripts/scripts.js'
                    ]
                }
            },
            prod: {
                files: {
                    '<%= yeoman.dist %>/prod/scripts/scripts.js': [
                        '<%= yeoman.dist %>/prod/scripts/scripts.js'
                    ]
                }
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('test', [
        'clean:local',
        'connect:test',
        'karma:unit'
    ]);

    /*
     Compiles the app with non-optimized build settings, places the build artifacts in the dist directory, and watches for file changes.
     Uses local api services and bootstraps with mock backend module
     Enter the following command at the command line to execute this build task:
     grunt local
     */
    grunt.registerTask('local', [
        'clean:local',
        'compass:dev',
        'copy:local',
        'template:local',
        'clean:template',
        'livereload-start',
        'express',
        'open',
        'watch'
    ]);

    /*
     Compiles the app with non-optimized build settings, places the build artifacts in the dist directory, and watches for file changes.
     Uses dev api services and bootstraps with main application
     Enter the following command at the command line to execute this build task:
     grunt dev
     */

    grunt.registerTask('dev', [
        'clean:local',
        'compass:dev',
        'copy:local',
        'template:localDev',
        'clean:template',
        'livereload-start',
        'express',
        'open',
        'watch'
    ]);

    /*
     Compiles the app with non-optimized build settings, places the build artifacts in the dist directory, and watches for file changes.
     Uses local api services and bootstraps with mock backend module
     Enter the following command at the command line to execute this build task:
     grunt local
     */
    grunt.registerTask('buildDemo', [
        'clean:demo',
//        'test',
        'copy:local',
        'compass:prod',
        'template:demo',
        'useminPrepare',
        'concat:.tmp/scripts/scripts.js',
        'concat:.tmp/styles/main.css',
        'imagemin:demo',
        'copy:demo',
        'cssmin:demo',
        'htmlmin:demo',
        'ngmin:demo',
        'uglify:demo',
        'concat:mock',
        'rev:demo',
        'usemin'
    ]);

    /*
     Compiles the app with non-optimized build settings, places the build artifacts in the dist directory, and watches for file changes.
     Uses dev api services and bootstraps with main application
     Enter the following command at the command line to execute this build task:
     grunt dev
     */
    grunt.registerTask('buildDev', [
        'clean:dev',
//        'test',
        'copy:local',
        'compass:prod',
        'template:dev',
        'useminPrepare',
        'concat:.tmp/scripts/scripts.js',
        'concat:.tmp/styles/main.css',
        'imagemin:dev',
        'copy:dev',
        'cssmin:dev',
        'htmlmin:dev',
        'ngmin:dev',
        'uglify:dev',
        'rev:dev',
        'usemin'
    ]);

    /*
     Compiles the app with optimized build settings and places the build artifacts in build/prod directory.
     Uses production api services and bootstrap with main application
     Enter the following command at the command line to execute this build task:
     grunt buildProd
     */
    grunt.registerTask('buildProd', [
        'clean:prod',
//        'test',
        'copy:local',
        'compass:prod',
        'template:prod',
        'useminPrepare',
        'concat:.tmp/scripts/scripts.js',
        'concat:.tmp/styles/main.css',
        'imagemin:prod',
        'copy:prod',
        'cssmin:prod',
        'htmlmin:prod',
        'ngmin:prod',
        'uglify:prod',
        'rev:prod',
        'usemin'
    ]);
};
