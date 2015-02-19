/*
Примерный файл подключения fw FEN
*/
var FEN = require('./require/fen');
var fen = new FEN();

//парсинг параметорв командной строки
fen.parseAgv();

//веб-сокет сервер, обязательно выставить конфиг модуля и клиентского ws.js
var server = require('./mdl/server/ws/server');
var wsserver = require('./mdl/server/ws/wsserver');
var config = require('./mdl/server/ws/config');
var actions = require('./mdl/server/ws/actions');
fen.addMdl('server', new server(fen, config.set('port',fen.argv['port']), actions));
fen.addMdl('wsserver', new wsserver(fen, config.set('wsport',fen.argv['wsport'])));