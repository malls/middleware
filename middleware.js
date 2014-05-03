var http = require('http');

var serverMethods = {

  server: null,
  counter: -1,
  queue: [],
  serverResponses: {"/": ""},

  up: function(){
    this.server = http.createServer(function(req,res){
      if(serverMethods.serverResponses[req.url]){
        res.end(serverMethods.serverResponses[req.url]);
      } else  {
        res.end(serverMethods.serverResponses['/']);
      }
    });
  },

  use: function(route, fn){
    this.queue.push(arguments);
    if(arguments.length > 1){
      serverMethods.serverResponses[route] = "";
    }
  },

  useHandler: function(use){
    var serveRoute = function(route){};

    var serveRes = {};

    if(arguments[0].length === 1){
      serveRes.write = function(x){
        for(var k in serverMethods.serverResponses){
          serverMethods.serverResponses[k] += x;
        }
      };
      serveRes.end = function(x){
        serverMethods.serverResponses['/'] += x;
      };
      arguments[0][0](serveRoute('/'), serveRes, this.next);
      if(arguments[0][0].length < 3){
        this.next();
      }
    } else {
      var myRoute = arguments[0][0];
      serveRes.write = function(x){
        serverMethods.serverResponses[myRoute] += x;
      };
      serveRes.end = function(x){
        serverMethods.serverResponses[myRoute] += x;
      };   
      arguments[0][1](serveRoute(myRoute), serveRes, this.next);
      if(arguments[0][1].length < 3){
        this.next();
      }
    }      
  },
  
  next: function(){
    serverMethods.counter += 1;
    if(serverMethods.counter < serverMethods.queue.length ){
      serverMethods.useHandler(serverMethods.queue[serverMethods.counter]);
    }
  },

  listen: function(port, fn){
    this.server.listen(port); 
    fn();
    this.next();
  }

};

var createServer = function(){
  serverMethods.up();
  return serverMethods;
};

module.exports.createServer = createServer;
