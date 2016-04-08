var should = require('should');
var postmarkLog = require('../');

describe('postmark-log node module', function () {
  it('must have at least one test', function () {
    postmarkLog();
    should.fail('Need to write tests.');
  });
});
