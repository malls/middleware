var http = require('http');

var serverMethods = {

  server: null,

  queue: [],

  serverResponse: "",

  serveRoute: function(route){
    http.get(route, function(res){
      this.serverResponse += res;
    });
  },

  serveRes: function(){},

  next: function(){
    (function(){
      console.log("server response",this.serverResponse);
    })();
  },

  up: function(){
    this.server = http.createServer();
    this.serveRes.__proto__.write = function(x){
      this.prototype.serverResponse += x;
      console.log('use write',x);
    };
    this.serveRes.__proto__.end = function(x){
      this.prototype.serverResponse += x;
      console.log("end response",this.prototype.serverResponse);
    };
  },

  use: function(route, fn){
    if(arguments.length === 1){
      this.queue.push(arguments[0]);
      arguments[0](this.serveRoute('/'), this.serveRes, this.next);
    } else {
      this.queue.push(fn);
      fn(this.serveRoute(route), this.serveRes, this.next);
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
