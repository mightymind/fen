/*
Примерный файл подключения fw FEN
*/
var FEN = require('./require/fen');
var fen = new FEN();

//парсинг параметорв командной строки
fen.parseAgv();

/*
//работа с внутренними параметрами
fen.set('text','123');
fen.echo(fen.get('text'));
*/

/*
//работа с модулями
fen.addMdl('util', require('util'));
fen.echo(fen.mdl('util').format("Test %s", "ahahahahaha"));
fen.echo(fen.mdl('util'));
fen.echo(fen.delMdl('util'));
*/

//fen.echo(typeof(FEN));
//fen.echo(fen.argv['port']);