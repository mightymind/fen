/*
Примерный файл подключения fw FEN
*/
var FEN = require('./require/fen');
var fen = new FEN();

//парсинг параметорв командной строки
fen.parseAgv();

var config = require('./mdl/mongo/native/config');

config.set('host', fen.argv['host'] || 'localhost');
config.set('port', fen.argv['port'] || 27017);
config.set('db', fen.argv['db'] || "test");

var FENMongo = require('./require/fen-mongo');

fen.addMdl('mongo', new FENMongo());
fen.mdl('mongo').setFEN(fen);

fen.mdl('mongo').runOnEvent('onConnect', function(Mongo){
	fen.echo('OnConnect1');
});

fen.mdl('mongo').runOnEvent('onConnect', function(Mongo){
	fen.echo('OnConnect2');
});

fen.mdl('mongo').connect(config, config.collections, function(Mongo){
	/*
	Mongo.q('test','delete').where({a : 'megatest',}).run();
	Mongo.q('test').fields({$set : {b : "blablabla",},}).options({multi : 1,}).run('update');
	Mongo.q('test','insert').what({title : "Test title",}).run();
	var cursor = Mongo.q('test','select').run();
	cursor.each(function(err, row) {
		Mongo.onE(err);

		if(row !== null) {
			console.dir(row);
		} else {
			//Mongo.disconnect();
			cursor.rewind();
		}
	});*/
	
	Mongo.q('test','insert').what({title : "Test title",}).callback(function(err, res){
		fen.echo('inserted');

		Mongo.genEvent('onTest');
	}).run();
	//fen.mdl('mongo').createEvent('onTest');

	Mongo.runOnEvent('onTest',function(Mongo){
		fen.echo('disconnect');
		Mongo.disconnect();
	});

});