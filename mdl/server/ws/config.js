/*
простой html-сервер. Конфиг
*/

module.exports = {
	root : "./mdl/server/ws/files",
	srv_root : "./mdl/server/ws",
	port : 5891,
	wsport : 5892,
	index : '/index.html',
	page404 : '/404.html',

	set : function(name, value) {
		this[name] = value;
		return this;
	},
};