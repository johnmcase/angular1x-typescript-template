/*
 * Usage:  node test [html|ci]
 */

const Server = require('karma').Server;
const CoverageGenerator = require('./coverageGenerator');
const reportType = process.argv[2];

var createCoverage = (exitCode) => {
  console.log('Test execution return exit code: ' + exitCode);

  if (exitCode === 0) {
    console.log('Tests completed successfully, generating ['+reportType+'] reports');
    new CoverageGenerator(reportType).generateCoverage((generationExitCode) => {
      // The node process is hanging on CI so idk what else to do
      process.exit(generationExitCode || 0);
    });
  }
  else {
    // The node process is hanging on CI so idk what else to do
    process.exit(exitCode);
  }
};

console.log("Running tests and generating [" + reportType + "] reports");
var server = new Server({configFile: __dirname + '/../conf/karma.conf.js'}, createCoverage);
server.start();
