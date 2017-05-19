const loadCoverage = require('remap-istanbul/lib/loadCoverage');
const remap = require('remap-istanbul/lib/remap');
const writeReport = require('remap-istanbul/lib/writeReport');
const MemoryStore = require('istanbul/lib/store/memory');

module.exports = function(reportType) {
  var coverage = loadCoverage(['reports/coverage/coverage.json']);
  var sources = new MemoryStore();
  var collector = remap(coverage, {
    sources: sources
  });

  this.generateCoverage = (done) => {
    switch(reportType) {
      case 'html':
        console.log('about to generate html reports');
        writeReport(collector, 'html', {}, 'reports/coverage/html').then(() => {
          console.log('done generating html reports');
          done();
        }).catch((ex) => {
          console.error('problem generating html reports: ' + ex);
          done(1);
        });;
        break;
      case 'ci':
        console.log('about to generate ci reports');
        writeReport(collector, 'cobertura', {}, 'reports/coverage/cobertura-coverage.xml').then(() => {
          console.log('done generating ci reports');
          done();
        }).catch((ex) => {
          console.error('problem generating ci reports: ' + ex);
          done(1);
        });
        break;
      default:
        console.error('Unknown report type: ' + reportType);
        done(1);
    }
  };
}
