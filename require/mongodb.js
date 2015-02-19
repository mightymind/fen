/*
класс работы с mongo
*/

function mongoDB(fen, config) {
	
	var mdb = this;
	
	mdb.MongoClient = require('mongodb').MongoClient;
	
	MongoClient.connect('mongodb://' + config.mongo_host + ':' + config.mongo_port + '/' + config.mongo_db, function (err, db){
		
		for name in config.collections {
			mdb.collections[name] = db.collection(config.collections[name]);
		}
		
		mdb.onError = function(err) {
			if(err) {throw err;}
		};
		
		mdb.q = function(collection, type, params) {
			/*
			params.where
			params.set
			params.document
			params.options
			params.callback
			*/
			var col = mdb.collections[collection];
			var callback = params.callback;
			
			switch(type) {
				
				case 'select': {
					
					collection.find(params.where, function(err, cursor) {
						if err {mdb.onError(err);}
						callback(cursor);
						//cursor.toArray(function(err, items) {});
						//each()/nextObject()/toArray()
					});
					
				}
				break;
				
				case 'insert': {
					
					col.insert(params.document, function(err, res){
						if err {mdb.onError(err);}
						callback(res);
						});
					});
					
				}
				break;
				
				case 'update': {
					
					col.update(params.where,params.set,params.options);
					
				}
				break;
				
				case 'delete': {
					//.remove
				}
				break;
				
				default: {
					
				}
				break;
				
			}
			
		}
		
	});
	
}

module.exports = mongoDB;