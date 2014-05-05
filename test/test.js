var server = require('../server');
var request = require('request');
var assert = require('assert');

describe('middleware', function(){

  describe('responses', function(){

    it('GET "/hello" should return "abchello"', function(){
      request('http://localhost:3000/hello', function(err, res, body){
        assert.equal("abchello", body);
      });
    });

    it('GET "/goodbye" should return "acgoodbye"', function(){
      request('http://localhost:3000/goodbye', function(err, res, body){
        assert.equal("acgoodbye", body);
      });
    });  

    it('GET "/" should return "acend"', function(){
      request('http://localhost:3000/', function(err, res, body){
        assert.equal("acend", body);
      });
    });

    it('GET "/anthingelse" should return "acend"', function(){
      request('http://localhost:3000/anythingelse', function(err, res, body){
        assert.equal("acend", body);
      });
    });

  });

});