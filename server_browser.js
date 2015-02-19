/*
Примерный файл подключения fw FEN
*/
var FEN = require('./require/fen');
var fen = new FEN();

//парсинг параметорв командной строки
fen.parseAgv();

//строка браузера
var server = require('./mdl/server/browser/server');
fen.addMdl('server', new server(fen, fen.argv['port']));