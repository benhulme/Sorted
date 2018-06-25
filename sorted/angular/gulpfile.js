// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var angularInjector = require('gulp-angular-injector');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');
var open = require('gulp-open');
var karma = require('karma');
var rimraf = require('gulp-rimraf');
var notify = require('gulp-notify');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var del = require('del');
var processhtml = require('gulp-processhtml');
var history = require('connect-history-api-fallback');
var useref = require('gulp-useref');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync').create();


// tasks
gulp.task('lint', function () {
  gulp.src(['./app/**/*.js', '!./bower_components/**'])
    .pipe(jshint({ jasmine: true }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
  gulp.src('./dist/*')
    .pipe(clean({force: true}));
});

gulp.task('bower', function () {
  gulp.src('./index.html')
    .pipe(wiredep({onError:notify.onError({
      message: 'Error: <%= error.message %>'
    })}))
    .on("error", notify.onError({
      message: 'Error: <%= error.lineNumber %>: <%= error.message %>'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('bower-update', function () {
  return bower({
    cmd: '--force update',
    verbosity: 1
  });
});

gulp.task('inject-index', function () {
  var sources = gulp.src([
    './app/app.js',
    './app/components/config/site.config.js',
    './app/**/*.js',
    './standalone/**/*.js',
    '!./standalone/login.js',
    '!./standalone/tools/**/*.js',
    '!./standalone/eventForms.js',
    '!./standalone/campaignFilter.js',
    '!./app/**/*.spec.js',
    './app/**/*.css',
    './assets/**/*.css'
  ], {read: false});

  var loginOptions = {
    starttag: '<!-- inject:login -->',
    endtag: '<!-- endinject -->'
  };

  var login = gulp.src([
    './standalone/login.js'
  ], {read: false});

  gulp.src('./index.html')
    .pipe(inject(sources))
    .pipe(inject(login, loginOptions))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  var injectAppFiles = gulp.src(['./app/**/*.scss', '!./app/app.scss'], {read: false});
  var target = gulp.src('./app/app.scss');

  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  return target.pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(gulp.dest('./app/'))
    // .pipe(autoprefixer({
    //     browsers: ['last 2 versions']
    // }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
    .pipe(connect.reload());

});

gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./assets/**/*.css', '!./bower_components/**'])
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('../themes/sorted/assets/'));
});

gulp.task('clean-angular', function(){
  gulp.src(['./app/**/*.js', '!./bower_components/**'])
    .pipe(angularInjector())
    .pipe(gulp.dest('./app/'));
});

gulp.task('minify-js', function() {
  gulp.src([
      './app/**/*.js',
      '!./bower_components/**',
      '!./app/**/*.spec.js',
      '!./app/components/constants/*.js',
      '!./app/components/config/site.config.js'
    ])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('../themes/sorted/app/'));
});

gulp.task('js-fef', function(){
  gulp.src([
      './app/**/*.js',
      '!./bower_components/**',
      '!./app/**/*.spec.js',
      '!./app/components/constants/*.js',
      '!./app/components/config/site.config.js'
    ])
    .pipe(concat('concat.js'))
    //.pipe(gulp.dest('../themes/sorted/app/'))
    .pipe(rename('app_prod.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../themes/sorted/app/'));
});

gulp.task('useref', function () {
    return gulp.src('../themes/sorted/templates/HomePage.ss')
        .pipe(gulp.dest('../'))
        //.pipe(rimraf({ force: true }))
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('../'));
    //.pipe(rimraf({ force: true }))
    //.pipe(gulp.dest('../themes/sorted/templates/'));


});

gulp.task('prod-build', ['useref'], function(){
    return gulp.src('../HomePage.ss')
        .pipe(rimraf({ force: true }))
        .pipe(gulp.dest('../themes/sorted/templates/'));
});

gulp.task('copy-bower-components', function () {
  gulp.src('./bower.json')
    .pipe(gulp.dest('../'));

  del('../bower_components');

  gulp.src('./bower_components/**', { base: './bower_components' })
    .pipe(gulp.dest('../bower_components'));
});

gulp.task('copy-html-files', function () {
  gulp.src([
      './*.ico',
      './*.txt',
      '!./node_modules/**',
      '!./dist/**'
    ])
    .pipe(gulp.dest('../'));
  gulp.src([
      './app/**/*.html',
      '!./node_modules/**',
      '!./dist/**'
    ])
    .pipe(gulp.dest('../themes/sorted/app/'));
});

gulp.task('copy-standalone', function() {
  gulp.src(['./standalone/**/*.*'])
    .pipe(uglify({}))
    .pipe(gulp.dest('../themes/sorted/standalone/'));
});

gulp.task('copy-json', function() {
  gulp.src(['./json/**'])
    .pipe(gulp.dest('../themes/sorted/json/'));
});

gulp.task('copy-config', function() {
  gulp.src(['./app/components/config/site.config.js'])
    .pipe(replace("APP_PATH: ''", "APP_PATH: '/themes/sorted/'"))
    .pipe(uglify({}))
    .pipe(gulp.dest('../themes/sorted/app/components/config/'));
});

gulp.task('copy-navigation', function() {
  gulp.src(['./app/components/navigation/navigation.html'])
    .pipe(rename('Navigation.ss'))
    .pipe(replace('ng-src="{{siteConfig.APP_PATH}}', 'src="/themes/sorted'))
    .pipe(gulp.dest('../themes/sorted/templates/Includes/'));
});

gulp.task('copy-email', function() {
  gulp.src(['./app/components/email-signup/email-signup.html'])
    .pipe(rename('EmailSignup.ss'))
    .pipe(replace('ng-src="{{siteConfig.APP_PATH}}', 'src="/themes/sorted'))
    .pipe(gulp.dest('../themes/sorted/templates/Includes/'));
});

gulp.task('copy-footer', function() {
  gulp.src(['./app/components/footer/footer.html'])
    .pipe(rename('Footer.ss'))
    .pipe(replace('ng-src="{{siteConfig.APP_PATH}}', 'src="/themes/sorted'))
    .pipe(gulp.dest('../themes/sorted/templates/Includes/'));
});

gulp.task('copy-assets', function() {
  gulp.src(['./assets/**/*.*'])
    .pipe(gulp.dest('../themes/sorted/assets/'));
});


gulp.task('set-app-view-path', function(){
  gulp.src('./app/app.js')
    .pipe(inject(gulp.src(['./src/*.js', './src/*.css', './src/*.html'], {read: false}), {
      starttag: '"{{ext}}": [',
      endtag: ']',
      transform: function (filepath, file, i, length) {
        return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('prepare-ss-file', function(){
// It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([
    '../themes/sorted/app/app_prod.js',
    '../themes/sorted/app/components/constants/*.js',
    '../themes/sorted/app/components/config/site.config.js',
    '../themes/sorted/standalone/**/*.js',
    '!../themes/sorted/standalone/tools/**/*.js',
    '!../themes/sorted/standalone/login.js',
    '!../themes/sorted/standalone/eventForms.js',
    '!../themes/sorted/standalone/campaignFilter.js',
    '!../themes/sorted/assets/css/moneyweek.css',
    '../themes/sorted/app/**/*.css',
    '../themes/sorted/assets/**/*.css'
  ], { read: false });

  var loginOptions = {
    starttag: '<!-- inject:login -->',
    endtag: '<!-- endinject -->',
    addRootSlash: true,
    relative: true
  };

  var login = gulp.src([
    '../themes/sorted/standalone/login.js',
  ], {read: false});

  gulp.src('./index.html')
    .pipe(processhtml())
    .pipe(rename('HomePage.ss'))
    .pipe(gulp.dest('../'))
    .pipe(rimraf({ force: true }))
    .pipe(wiredep({cwd: '../'}))
    .pipe(inject(sources, { addRootSlash: true, relative: true}))
    .pipe(inject(login, loginOptions))
    //.pipe(concat('all.js'))
    .pipe(gulp.dest('../themes/sorted/templates/')) ;
});

gulp.task('prepare-page-ss', function(){
// It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([
    '../themes/sorted/standalone/**/*.js',
    '../themes/sorted/app/**/*.css',
    '../themes/sorted/assets/**/*.css',
    '!../themes/sorted/standalone/tools/**/*.js',
    '!../themes/sorted/assets/css/moneyweek.css',
    '!../themes/sorted/standalone/eventForms.js',
    '!../themes/sorted/standalone/campaignFilter.js',
  ], {read: false});

  gulp.src('../themes/sorted/templates/Page.ss')
    .pipe(gulp.dest('../'))
    .pipe(rimraf({ force: true }))
    .pipe(wiredep({cwd: '../'}))
    .pipe(inject(sources, { addRootSlash: true, relative: true}))
    .pipe(gulp.dest('../themes/sorted/templates/')) ;
});

gulp.task('prepare-ss-file-prod', function() {
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src([
    '../themes/sorted/app/app_prod.js',
    '../themes/sorted/app/components/constants/*.js',
    '../themes/sorted/app/components/config/site.config.js',
    '../themes/sorted/standalone/**/*.js',
    '!../themes/sorted/standalone/tools/**/*.js',
    '!../themes/sorted/standalone/login.js',
    '!../themes/sorted/standalone/eventForms.js',
    '!../themes/sorted/standalone/campaignFilter.js',
    '../themes/sorted/app/**/*.css',
    '../themes/sorted/assets/**/*.css'
  ], { read: false });

  var loginOptions = {
    starttag: '<!-- inject:login -->',
    endtag: '<!-- endinject -->',
    addRootSlash: true,
    relative: true
  };

  var login = gulp.src([
    '../themes/sorted/standalone/login.js',
  ], {read: false});

  gulp.src('./index.html')
    .pipe(processhtml())
    .pipe(rename('HomePage.ss'))
    .pipe(gulp.dest('../'))
    .pipe(rimraf({ force: true }))
    .pipe(wiredep({cwd: '../'}))
    .pipe(inject(sources, { addRootSlash: true, relative: true}))
    .pipe(inject(login, loginOptions))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('../themes/sorted/templates/')) ;
});

gulp.task('test', function() {

  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  });
  server.start();

});

gulp.task('watch', function(){
  console.log("watching....");
  gulp.watch('./app/**/*.js', ['inject-index','sass']);
  gulp.watch('./app/**/*.scss', ['sass']);
  gulp.watch('./app/**/*.html', ['html']);
  gulp.watch('./assets/**/*.css', ['inject-index']);
});

gulp.task('serve', function () {
  connect.server({
    root: '',
    port: 8000,
    livereload: true,
    middleware: function (connect, opt) {
      return [ history({}) ];
    }
  });
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:8000'}));
});


gulp.task('serveDist', function () {
  connect.server({
    root: 'dist/',
    port: 9000,
    livereload: true
  });
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:9000'}));
});


//for browser testing
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "sorted.dev"
    });
});


// default task
gulp.task('default', [
  'lint',
  'sass',
  'inject-index',
  'bower',
  'serve',
  'watch'
]);



//to do update injector to injec the minified files
gulp.task('build', function() {
  runSequence([
    'clean'], [
    'lint',
    'sass',
    'inject-index',
    'copy-standalone',
    'copy-assets',
    //'copy-config',
    //'copy-navigation',
    //'copy-email',
    //'copy-footer',
    'minify-css',
    'clean-angular',
    'minify-js',
    'bower',
    'copy-html-files',
    'js-fef',
    'prepare-page-ss',
    'prepare-ss-file'
  ]);
});

