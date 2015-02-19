/*
сервер-счетчик
*/

var server = function(fen, port) {
	
	var http = require("http");
	this.emitter = new http.Server();
	this.emitter.on('request',function(req,res){
		//console.log(req);
		//debugger;
		res.end(req.headers['user-agent']);
	});
	this.emitter.listen(port);
	
	//return this;
}

module.exports = server;