/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 2:03 PM
 * File: Gruntfile.js
 */

'use strict';
var path = require('path');
var templateEnv = '';


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
            options: {
                livereload: true,
                spawn: false
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,**/}*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            all: {
                files: [
                    '<%= yeoman.app %>/{,**/}*.html',
                    '{<%= yeoman.stage %>,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{<%= yeoman.stage %>,<%= yeoman.app %>}/app/{,**/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['copy:local']
            },
            template: {
                files: [
                    '<%= yeoman.app %>/{,**/}*.template'
                ]
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.all.options.port %>'
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
        copy: {
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
            all: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
//                    bases: ['/.tmp'],
                    bases: path.resolve('/.tmp'),
//                    debug: true,
//                    monitor: {},
//                    server: ['./server'],
                    server: path.resolve('./server'),
                    livereload: true
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

    /* Watches for changed template files and reprocesses them accordingly */
    grunt.event.on('watch', function(action, filepath, target) {
        if (filepath.match(/html.template/).length > 0) {
            grunt.task.run('template:' + templateEnv);
        }
    });
    grunt.util.hooker.hook(grunt.task, function() {
        var task = grunt.task.current.nameArgs;
        if (task.split(':')[0] === 'template') {
            templateEnv = task.split(':')[1];
        }
    });


    grunt.registerTask('test', [
        'clean:local',
        'connect:test',
        'karma:unit'
    ]);

    grunt.registerTask('server', [
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
    grunt.registerTask('local', [
        'clean:local',
        'compass:dev',
        'copy:local',
        'template:local',
        'clean:template',
        'server'
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
        'server'
    ]);

    /*
     Compiles the app with non-optimized build settings, places the build artifacts in the dist directory, and watches for file changes.
     Uses local api services and bootstraps with mock backend module
     Enter the following command at the command line to execute this build task:
     grunt local
     */
    grunt.registerTask('buildDemo', [
        'clean:demo',
        'test',
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
        'test',
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
        'test',
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
