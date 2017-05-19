module.exports = function (config) {
  const configuration = {
    basePath: '../',
    singleRun: true,
    autoWatch: true,
    logLevel: 'INFO',
    browsers: [
      'PhantomJS'
    ],
    frameworks: [
      'jasmine',
      'source-map-support',
      'jasmine-matchers'
    ],
    files: [
      'src/index.spec.js',
      'src/**/*.html'
    ],
    preprocessors: {
      ['src/index.spec.js']: [
        'webpack',
        'sourcemap'
      ],
      ['src/**/*.html']: [
        'ng-html2js'
      ]
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/'
    },
    reporters: ['mocha', 'junit', 'coverage'],
    junitReporter: {
      outputDir: 'reports/junit',
      useBrowserName: false
    },
    coverageReporter: {
      type: 'json',
      dir: 'reports/coverage',
      subdir: '.',
      file: 'coverage.json'
    },
    webpack: require('./webpack.karma')(),
    webpackMiddleware: {
      noInfo: true
    }
  };

  config.set(configuration);
};
