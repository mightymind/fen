/*
обработчики запроса к серверу
*/

var actions = {};
actions['/test'] = function($) {
	$.fen.echo("Action run!");
	$.res.end("test");
	},

module.exports = actions;