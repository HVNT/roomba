/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 2:03 PM
 * File: Gruntfile.js
 */

'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};


module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'src',
        dist: 'dist',
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
//                files: [
//                    {expand: true, cwd: './tmp/', src: ['**'], dest: './dist/'}
//                ]
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>/dev',
                    src: ['**']
                }]
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
                src: [
                    './tmp/scripts/scripts.min.js',
                    './tmp/components/angular-mocks/angular-mocks.js',
                    './tmp/app/mock.js'
                ],
                dest: './tmp/scripts/scripts.demo.js'
            }
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
        }
    });

    grunt.loadNpmTasks('grunt-hustler');

    grunt.renameTask('regarde', 'watch');

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
        'connect:livereload',
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
        'clean:dist',
        'compass:dev', // Compile compass: app -> tmp
        'template:shimLocalDev',
        'copy:prep', // Copy all html/css/js: app -> tmp
        'template:indexLocalDev', // Compile templates: app -> tmp
        'copy:dev', // Copy all from: tmp -> dist
        'clean:temp',
        'server'
    ]);

    /*
     Compiles the app with non-optimized build settings, places the build artifacts in the dist directory, and watches for file changes.
     Uses local api services and bootstraps with mock backend module
     Enter the following command at the command line to execute this build task:
     grunt local
     */
    grunt.registerTask('buildDemo', [
        'clean:buildDemo',
        'compass:dist', // Compile compass: app -> tmp
        'template:shimDemo', // Template requirejs shim -> tmp
        'copy:prep', // Copy components, styles, app, core, assets, **.html: app -> tmp
        'requirejs:prod', // Create minified scripts from shim: app -> tmp
        'concat:demo', // Attach angular-mocks and mock.js to tmp/scripts/scripts.min.js -> tmp/scripts/scripts.demo.js
        'template:indexDemo', // Compile templates: app -> tmp
        'copy:buildDemo', // Copy all from: tmp -> demo
        'clean:temp'
    ]);

    /*
     Compiles the app with non-optimized build settings, places the build artifacts in the dist directory, and watches for file changes.
     Uses dev api services and bootstraps with main application
     Enter the following command at the command line to execute this build task:
     grunt dev
     */
    grunt.registerTask('buildDev', [
        'clean:buildDev',
        'compass:dev', // Compile compass: app -> tmp
        'template:shimDev', // Template requirejs shim -> tmp
        'copy:prep', // Copy styles, app, core, assets, **.html: app -> tmp
        'requirejs:dev', // Builds all js from tmp/ -> tmp/scripts/scripts.dev.js
        'template:indexDev', // Compile index.html.template: app -> tmp
        'copy:buildDev', // Copy **.html, components, img, scripts/scripts.dev.js, styles/main.css -> build/dev
        'clean:temp'
    ]);

    /*
     Compiles the app with optimized build settings and places the build artifacts in build/prod directory.
     Uses production api services and bootstrap with main application
     Enter the following command at the command line to execute this build task:
     grunt buildProd
     */
    grunt.registerTask('buildProd', [
        'clean:buildProd',
        'compass:dist', // Compile compass: app -> tmp
        'template:shimProd', // Template requirejs shim -> tmp
        'copy:prep', // Copy styles, app, core, assets, **.html: app -> tmp
        'requirejs:prod', // Builds all js from tmp/ -> tmp/scripts/scripts.min.js
        'template:indexProd', // Compile index.html.template: app -> tmp
        'copy:buildProd', // Copy **.html, components, img, scripts/scripts.dev.js, styles/main.css -> build/dev
        'clean:temp'
    ]);
};
