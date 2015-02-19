/*
прокси-сервер
*/

var server = function(fen, port) {
	
	var http = require('http');
	var net = require('net');
	var url = require('url');

	var proxy = http.createServer(function (req, res) {
			//res.writeHead(200, {'Content-Type': 'text/plain'});
			//res.end('okay');
		});

	proxy.on('connect', function(req, cltSocket, head) {
		var srvUrl = url.parse('http://' + req.url);
		var srvSocket = net.connect(srvUrl.port||80, srvUrl.hostname, function() {
			cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
				'Proxy-agent: Node-Proxy\r\n' +
				'\r\n');
			srvSocket.write(head);
			srvSocket.pipe(cltSocket);
			cltSocket.pipe(srvSocket);
		});
	});

	/*
	proxy.listen(port, '127.0.0.1', function() {

		var options = {
			port: port,
			hostname: '127.0.0.1',
			method: 'CONNECT',
			path: 'www.google.com:80',
		};

		var req = http.request(options);
		req.end();

		req.on('connect', function(res, socket, head) {

			socket.write('GET / HTTP/1.1\r\n' +
				'Host: www.google.com:80\r\n' +
				'Connection: close\r\n' +
				'\r\n');
			socket.on('data', function(chunk) {
				console.log(chunk.toString());
			});
			socket.on('end', function() {
				//proxy.close();
			});

		});

	});
	*/
	
	proxy.listen(port);
	this.emitter = proxy;

	//return this;
}

module.exports = server;