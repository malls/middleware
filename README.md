#Middleware
A Node.js microframework implementing Express's middleware feature.

```
var middleware = require('./middleware');
var app = middleware.createServer();
```

##Methods

###use
Sets up responses for route requests using res.write() and res.end(). If no route is given, res.write() will be applied to all routes. Use res.write()'s before res.end()'s.

```
app.use([route], function(req, res, next){
  res.write('a');
  next();
});

app.use([route], function(req, res){
  res.end('b');
});
```

###listen

Tells the server to start listening on a specified port, with an optional callback.
```
app.listen(port, [callback]);
```