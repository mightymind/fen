/*
простой web-socket-сервер
*/

function WSServer(fen, config) {

	fen.echo("WSServer created.");

	var wss = new require("ws");
	var domain = require("domain").create();
	var server;
	var clients = {};

	domain.on('error',function(err){
		console.error("WS %s", err);
	});

	domain.run(function(){
		server = new wss.Server({port: config.wsport});
		});

	server.on('connection', function(ws) {
		var id = Math.random();
		clients[id] = ws;
		fen.echo("новое соединение " + id);
		
		ws.on('message', function(message) {
			fen.echo('получено сообщение от ' + id + ': ' + message);
			for(var key in clients) {
				clients[key].send(message);
			}
		});

		ws.on('close', function() {
			fen.echo('соединение закрыто ' + id);
			delete clients[id];
		});
	});

	this.server = server;

	fen.echo("WSPort is listening.");
}

module.exports = WSServer;
