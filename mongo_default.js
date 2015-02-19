/*
Примерный файл подключения fw FEN
*/
var FEN = require('./require/fen');
var fen = new FEN();

//парсинг параметорв командной строки
fen.parseAgv();

var config = require('./mdl/mongo/default/config');
config.set('host', fen.argv['host'] || 'localhost');
config.set('port', fen.argv['port'] || 27017);
config.set('db', fen.argv['db'] || "test");
config.set('col', fen.argv['col'] || "test");

config.set('insert', fen.argv['insert'] || 1);

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://' + config.host + ':' + config.port + '/' + config.db, function (err, db){
	//if(err) {throw err;}
	
	var collection = db.collection(config.col);
	collection.insert({a:config.insert}, function(err, docs){
		
		var cursor = collection.find({a:config.insert});
		cursor.toArray(function(err, res){
			console.dir(res);
			
			db.close();
		});
		
	});
});