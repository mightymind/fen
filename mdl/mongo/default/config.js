/*
простой html-сервер. Конфиг
*/

module.exports = {
	host : 'localhost',
	port : 27017,
	db : 'test',

	set : function(name, value) {
		this[name] = value;
		return this;
	},
};