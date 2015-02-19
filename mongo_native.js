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

var FEMongo = require('./require/fe-mongo');

fen.addMdl('mongo', new FEMongo());
fen.mdl('mongo').setFEN(fen);

fen.mdl('mongo').connect(config, config.collections, function(Mongo){
	
	Mongo.delete('test',
	{
		where : {
			a : 'megatest',
		},
		options : {

		},
	},
	function(res){
		//console.dir(res);
	}
	);

	Mongo.update('test',
	{
		where : {
			//a : 'megatest',
		},
		fields : {
			$set : {
				b : "blablabla",
			},
		},
		options : {
			multi : 1,
		},
	},
	function(res){
		//console.dir(res);
	}
	);

	Mongo.insert('test', {
		what: {
			title : "Test title",
		}
	}, function(res){
		//console.dir(res);
	});

	/*Mongo.co('test').insert({a:"megatest"},function(err, docs){});*/
	var  cursor = Mongo.select('test',{},function(res){
		//console.dir(res);

		res.each(function(err, row){
			Mongo.onE(err);

			if(row !== null) {
				console.dir(row);
			} else {
				//Mongo.disconnect();
			}
		});

	});
	/*
	var cursor = Mongo.co('test').find().sort({a:1});
	cursor.each(function(err, row){
		if(row !== null) {
			console.dir(row);
		} else {
			Mongo.disconnect();
		}
	});
	*/
	cursor.rewind();
});