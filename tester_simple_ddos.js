/*
Примерный файл подключения fw FEN
*/
var FEN = require('./require/fen');
var fen = new FEN();

//парсинг параметорв командной строки
fen.parseAgv();

//fen.set('start',fen.now());

var tester = require('./mdl/tester/simple_ddos/tester');
var config = require('./mdl/tester/simple_ddos/config');
config.set('host', fen.argv['host'] || "localhost");
config.set('port', fen.argv['port'] || 80);
config.set('count', parseInt(fen.argv['count']) || 1);
config.set('path', fen.argv['path'] || "/");
config.set('post_data', {
	"test":"test",
});
//config.set('agent', '/////');
//config.set('auth', "user:password");
config.set('onResponse', function(data){
	//process.stdout.write(data.toString());
	fen.echo("Получено данных: " + data.toString().length + " //mem: " + process.memoryUsage().heapUsed);
});
//config.set('method',fen.argv['method']);

fen.addMdl('tester', new tester(fen, config));