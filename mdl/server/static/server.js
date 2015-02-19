/*
простой html-сервер
*/

//var util = require('util');
var fs = require('fs');
var url = require("url");
//var querystring = require("querystring");
var http = require("http");
var domain = require("domain").create();
var server;
var file_exists = {};

domain.on('error',function(err){
	console.error("%s", err);
});

domain.run(function(){
	server = new http.Server();
	});

function StaticServer(fen, config, actions) {

	fen.echo("Server created.");

	server.on('request', function(req,res){

		var urlobj = url.parse(req.url, true);

		if(urlobj.pathname == '/') {
			urlobj.pathname = config.index;
		}

		if(urlobj.pathname!=="/favicon.ico") {
			fen.echo(urlobj.pathname + " // Memory " + process.memoryUsage().heapUsed);
		}
		
		//switch(urlobj.pathname) { case '/favicon.ico':{}break; default: {}break;}
		
		var fname = config.root + urlobj.pathname;

		if(file_exists[urlobj.pathname] || fs.existsSync(fname)) {
			
			file_exists[urlobj.pathname]=true;
			res.writeHead(200, {"Cache-control": "public"});
			var file = new fs.ReadStream(fname);
			file.pipe(res);

		} else if(actions[urlobj.pathname]) {
			
			actions[urlobj.pathname]({
				req : req,
				res : res,
				fen : fen,
				config : config,
				urlobj : urlobj,
			});

		} else {
			
			if(fs.existsSync(config.root + config.page404)) {
				res.writeHead(200, {"Cache-control": "no-cache, no-store", "Content-Type": "text/html"});

				var file = new fs.ReadStream(config.root + config.page404);
				file.pipe(res);
			} else {
				res.writeHead(404, {"Content-Type": "text/plain"});
				res.end("Page " + urlobj.pathname + " not found");
			}

		}

	});

	server.listen(config.port);

	this.server = server;

	fen.echo("Port is listening.");
}

module.exports = StaticServer;