/*
простой html-сервер
*/

//var util = require('util');
var http = require("http");
//var domain = require("domain").create();
var querystring = require('querystring');

/*
domain.on('error',function(err){
	console.error("%s", err);
});

domain.run(function(){
	server = new http.Server();
	});
*/

function Tester(fen, config) {

	var post_data = querystring.stringify(config.post_data);
	var r = {
		host : config.host,
		port : config.port,
		method : config.method,
		path : config.path,
		//auth : config.auth,
		//agent : config.agent,
		headers : {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post_data.length,
			},
	};

	fen.echo("Test started.");

	//fen.set('start', fen.now());

	for (var i = 1; i <= config.count; i++) {
		
		(function(){

		var request = http.request(
			r,
			function(response) {
				response.on("data", config.onResponse);
				//fen.sleep(50);
				//var now = fen.now();
				//fen.echo("time " + ((fen.now() - fen.get('start'))/1000));
				//fen.set('start', now);
				}
			);
		request.write(post_data);
		request.end();

		})();

	};

}

module.exports = Tester;