/*
Примерный файл подключения fw FEN
*/
var FEN = require('./require/fen');
var fen = new FEN();

//парсинг параметорв командной строки
fen.parseAgv();

//сервер статичных файлов
var server = require('./mdl/server/static/server');
var config = require('./mdl/server/static/config');
var actions = require('./mdl/server/static/actions');
fen.addMdl('server', new server(fen, config.set('port',fen.argv['port']), actions));//fen.argv['port']||8080, './mdl/server/static/files'));