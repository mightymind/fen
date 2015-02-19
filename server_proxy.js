/*
Примерный файл подключения fw FEN
*/
var FEN = require('./require/fen');
var fen = new FEN();

//парсинг параметорв командной строки
fen.parseAgv();

//прокси-сервер - нерабочий
var server = require('./mdl/server/proxy/server');
fen.addMdl('server', new server(fen, fen.argv['port']));