/*
Нативная работа с Mongo
*/

var domain = require("domain").create();
var FEMongo;

domain.on('error',function(err){
	console.error("Mongo: %s", err);
});

domain.run(function(){
	FEMongo = function() {};
	});

FEMongo.prototype.is_connected = false;
FEMongo.prototype.fen = {};

FEMongo.prototype.client = {};
FEMongo.prototype.db = {};
FEMongo.prototype.collections = {};


FEMongo.prototype.setFEN = function(fen) {
	this.fen = fen;
}

FEMongo.prototype.connect = function(config, collections, callback) {

	var mn = this;

	mn.client = require('mongodb').MongoClient;
	mn.client.connect('mongodb://' + config.host + ':' + (config.port || 27017) + '/' + config.db, function (err, db){
		if(err) {

			mn.is_connected = false;

		} else {

			mn.is_connected = true;
			mn.db = db;
			for (var col in collections) {
				mn.collections[col] = mn.db.collection(col);
			}
			callback(mn);

		}
	});
}

FEMongo.prototype.disconnect = function() {
	if(this.is_connected) {
		this.db.close();
		//delete this;
	}
}

FEMongo.prototype.co = function(name) {
	if(this.is_connected) {
		return this.collections[name];
	} else {
		
	}
}

FEMongo.prototype.onE = function(err) {
	if(err) {
		console.error(err);
	}
}

FEMongo.prototype.q = function(col, type) {
	var mn = this;

	var o = {
		__collection : mn.co(col),
		__type : type,
		__where : {},
		__fields : {},
		__options : {},
		__what : {},
		__cb : function(err, res) {return this;},

		where : function(obj) {
			this.__where = obj;
			return this;
		},

		fields : function(obj) {
			this.__fields = obj;
			return this;
		},

		options : function(obj) {
			this.__options = obj;
			return this;
		},

		what : function(obj) {
			this.__what = obj;
			return this;
		},

		callback : function(fnc) {
			this.__cb = fnc;
			return this;
		},

		run : function() {
			var self = this;
			var for_return = self;

			switch(this.__type) {

				case 'select': {

					var cursor = this.__collection.find(this.__where, this.__fields, this.__options);
					self.__cb(null, cursor);
					for_return = cursor;

				}
				break;

				case 'insert': {
					
					this.__collection.insert(this.__what, function(err, res) {
						mn.onE(err);
						self.__cb(err, res);
					});

				}
				break;

				case 'update': {
					
					this.__collection.update(this.__where, this.__fields, this.__options, function(err, res) {
						mn.onE(err);
						self.__cb(err, res);
					});

				}
				break;

				case 'delete': {
					
					this.__collection.remove(this.__where, this.__options, function(err, res) {
						mn.onE(err);
						self.__cb(err, res);
					});
					
				}
				break;

				default: {

				}
				break;
			};

			return for_return;

		},
	};

	return o;
}


/*
FEMongo.prototype.select = function(col, options, callback) { // deprecated
	var cursor = this.co(col).find(options.where, options.fields, options.options);
	callback(cursor);
	return cursor;
}

FEMongo.prototype.insert = function(col, options, callback) { // deprecated
	var mn = this;
	this.co(col).insert(options.what, function(err, res) {
		mn.onE(err);
		callback(res);
	});
}

FEMongo.prototype.update = function(col, options, callback) { // deprecated
	var mn = this;
	this.co(col).update(options.where, options.fields, options.options, function(err, res) {
		mn.onE(err);
		callback(res);
	});
}

FEMongo.prototype.delete = function(col, options, callback) { // deprecated
	var mn = this;
	this.co(col).remove(options.where, options.options, function(err, res) {
		mn.onE(err);
		callback(res);
	});
}
*/


/*

https://github.com/mongodb/node-mongodb-native/blob/master/Readme.md



var mongo = require('mongodb');
// Create new instances of BSON types
new mongo.Long(numberString)
new mongo.ObjectID(hexString)
new mongo.Timestamp()  // the actual unique number is generated on insert.
new mongo.DBRef(collectionName, id, dbName)
new mongo.Binary(buffer)  // takes a string or Buffer
new mongo.Code(code, [context])
new mongo.Symbol(string)
new mongo.MinKey()
new mongo.MaxKey()
new mongo.Double(number)  // Force double storage




var ObjectID = require('mongodb').ObjectID;
new ObjectID(idString) - для поиска по _id





collection.insert({a:2}, function(err, docs) {
	});
collection.count(function(err, count) {
	console.log(format("count = %s", count));
	});
collection.find().toArray(function(err, results) {
	console.dir(results);

	//db.close();
	});
collection.findOne({})
collection.findOne({_id: new ObjectID(idString)}, console.log)

db.dropDatabase(function(err, done) {});
db.createCollection('test_custom_key', function(err, collection) {});

db.close();


var cursor = collection.find(query, [fields], options);
cursor.sort(fields).limit(n).skip(m).

cursor.nextObject(function(err, doc) {});
cursor.each(function(err, doc) {});
cursor.toArray(function(err, docs) {});

cursor.rewind()  // reset the cursor to its initial state.


Useful chainable methods of cursor. These can optionally be options of find instead of method calls:

.limit(n).skip(m) to control paging.
.sort(fields) Order by the given fields. There are several equivalent syntaxes:
.sort({field1: -1, field2: 1}) descending by field1, then ascending by field2.
.sort([['field1', 'desc'], ['field2', 'asc']]) same as above
.sort([['field1', 'desc'], 'field2']) same as above
.sort('field1') ascending by field1

Other options of find:

fields the fields to fetch (to avoid transferring the entire document)
tailable if true, makes the cursor tailable.
batchSize The number of the subset of results to request the database to return for every request. This should initially be greater than 1 otherwise the database will automatically close the cursor. The batch size can be set to 1 with batchSize(n, function(err){}) after performing the initial query to the database.
hint See Optimization: hint.
explain turns this into an explain query. You can also call explain() on any cursor to fetch the explanation.
snapshot prevents documents that are updated while the query is active from being returned multiple times. See more details about query snapshots.
timeout if false, asks MongoDb not to time out this cursor after an inactivity period.







collection.insert(docs, options, [callback]);

db.collection('test').insert({hello: 'world'}, {w:1}, function(err, objects) {
	if (err) console.warn(err.message);
	if (err && err.message.indexOf('E11000 ') !== -1) {
		// this _id was already inserted in the database
	}
});




collection.update(criteria, objNew, options, [callback]);
Useful options:

w:1 Should always set if you have a callback.
multi:true If set, all matching documents are updated, not just the first.
upsert:true Atomically inserts the document if no documents matched.

db.collection('test').update({hi: 'here'}, {$set: {hi: 'there'}}, {w:1}, function(err) {
	if (err) console.warn(err.message);
	else console.log('successfully updated');
});



collection.findAndModify(query, sort, update, options, callback)
db.collection('test').findAndModify({hello: 'world'}, [['_id','asc']], {$set: {hi: 'there'}}, {}, function(err, object) {
	if (err) console.warn(err.message);
	else console.dir(object);  // undefined if no matching object exists.
	});



*/

module.exports = FEMongo;