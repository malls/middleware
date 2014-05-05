var http = require('http');

//createServer function. Starts server with .up method, then returns object with methods used by app
var createServer = function(){
  serverMethods.up();
  return serverMethods;
};

var serverMethods = {

  // Items set by methods
  server: null,
  counter: -1,
  queue: [],
  serverResponses: {"/": ""},

  // Creates server, responds to requests
  up: function(){
    this.server = http.createServer(function(req,res){
      if(serverMethods.serverResponses[req.url]){
        res.end(serverMethods.serverResponses[req.url]);
      } else  {
        res.end(serverMethods.serverResponses['/']);
      }
    });
  },

  // Pushes .use cases to a the queue to be processed by next/useHandler 
  use: function(route, fn){
    this.queue.push(arguments);
    if(arguments.length > 1){
      serverMethods.serverResponses[route] = "";
    }
  },

  // Uses http to listen on port, runs callback, starts the useHandlers
  listen: function(port, fn){
    this.server.listen(port, function(){
      fn();
    }); 
    this.next();
  },

  // Runs useHander if need be
  next: function(){
    serverMethods.counter += 1;
    if(serverMethods.counter < serverMethods.queue.length ){
      serverMethods.useHandler(serverMethods.queue[serverMethods.counter]);
    }
  },

  // Creates server resonses for each .use case
  useHandler: function(use){
    var req;
    var res = {};

    if(arguments[0].length === 1){
      res.write = function(x){
        for(var k in serverMethods.serverResponses){
          serverMethods.serverResponses[k] += x;
        }
      };
      res.end = function(x){
        serverMethods.serverResponses['/'] += x;
      };
      arguments[0][0](req, res, this.next);
      if(arguments[0][0].length < 3){
        this.next();
      }
    } else {
      var myRoute = arguments[0][0];
      res.write = function(x){
        serverMethods.serverResponses[myRoute] += x;
      };
      res.end = function(x){
        serverMethods.serverResponses[myRoute] += x;
      };   
      arguments[0][1](req, res, this.next);
      if(arguments[0][1].length < 3){
        this.next();
      }
    }      
  }

};

module.exports.createServer = createServer;