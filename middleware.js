var http = require('http');

var serverMethods = {

  server: null,

  queue: [],

  up: function(){
    this.server = http.createServer();
  },

  use: function(route, fn){
    if(arguments.length === 1){
      console.log(1);
      this.queue.push(arguments[0]);
    } else {
      console.log(2);
      //do something with route
      this.queue.push(fn);
    }      
  },

  listen: function(port, fn){
    this.server.listen(port); 
    fn();
  }

};

var createServer = function(){
  serverMethods.up();
  return serverMethods;
};

module.exports.createServer = createServer;
