/*
простой html-сервер. Конфиг
*/

module.exports = {
	root : "./mdl/server/static/files",
	srv_root : "./mdl/server/static",
	port : 5891,
	index : '/index.html',
	page404 : '/404.html',
	
	mongo_host : 'localhost',
	mongo_port : 27017,
	mongo_db : 'static',

	set : function(name, value) {
		this[name] = value;
		return this;
	},
};