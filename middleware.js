// make these functions

  // - createServer()
  // - use()
  // - listen()

var http = require('http');

var createServer = function(param){
  createServer.up();
  return createServer;
};

createServer.__proto__ = {
  up: function(){
  },

  use: function(route, fn){
    if(arguments.length === 1){
      console.log(1);
      //fn();
    } else {
      console.log(2);
      //do something with route
      // fn();
    }  
  },

  listen: function(port, fn){
    //connect to port;  
    fn();
  }
};

module.exports.createServer = createServer;
