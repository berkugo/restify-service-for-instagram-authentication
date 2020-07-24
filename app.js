'use strict';
const restify = require('restify');
const Router = require("./routes/router.js");
const serverName = "Findfluencer || Authentication Service"
const server = restify.createServer({ name: serverName });
const routerInstance = new Router(server)

server.use(restify.plugins.queryParser({ mapParams: false }));
server.pre(log)


routerInstance.activateAuthEndpoint();
routerInstance.activateUserEndPoints();



server.listen(5000, () => {

    console.log('%s listening at %s', server.name, server.url)
    
});



function log(req, res, next) {
    console.log(`[${req.method}]Incoming request to - ${req.path()} endpoint.`);
    next();
}

