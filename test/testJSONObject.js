const log4js = require('log4js');
const logger = log4js.getLogger();
const should = require('chai').should(),
expect = require('chai').expect,
assert = require ('chai').assert,
convertJSON = require('../js/convertjson');

describe('A series of test for JSON Object', function(err){
  it('should accept valid values', function(done){
      let country = ['India', 'China', 'Bhutan', 'Sri Lanka', 'Bangladesh'];
  	   var result = convertJSON(2000, 2006, country);
       assert.equal(result, 'Converted successfully');
       result.should.be.equal('Converted successfully');
       done();
    });
  
  });
