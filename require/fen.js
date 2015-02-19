/*
Главный файл фреймворка
*/

var FEN = function() {

}

/*
работа с параметрами
*/

FEN.prototype.__param = {};
FEN.prototype.setParams = function(obj) {
	this.__param = obj;
	return this;
}
FEN.prototype.set = function(name, value) {
	this.__param[name] = value;
	return this;
}
FEN.prototype.get = function(name) {
	return this.__param[name];
}

/*
/работа с параметрами
*/


/*
служебные одиночные
*/

FEN.prototype.echo = function(text) {
	console.log(text);
}

FEN.prototype.isDef = function(v) {
	if(v == undefined || typeof v == "undefined") {
		return false;
	} else {
		return true;
	}
}

FEN.prototype.isNull = function(v) {
	if(v == null) {
		return true;
	} else {
		return false;
	}
}

FEN.prototype.now = function() {
	return new Date().getTime();
}
FEN.prototype.sleep = function(milliSeconds) {
	var startTime = this.now();
	while (this.now() < startTime + milliSeconds);
}

FEN.prototype.argv = {};
FEN.prototype.parseAgv = function(sym) {
	for (var i = 0; i < process.argv.length; i++) {
		var arr = process.argv[i].split(sym||"=");
		this.argv[arr[0]]=arr[1];
	}
}

/*
/служебные одиночные
*/


/*
модули
*/

FEN.prototype.__mdl = {};
FEN.prototype.addMdl = function(name, mdl) {
	this.__mdl[name] = mdl;
	return this;
}
FEN.prototype.delMdl = function(name) {
	this.__mdl[name] = null;
	delete this.__mdl[name];
	return this.isDef(this.__mdl[name]);
}
FEN.prototype.mdl = function(name) {
	return this.__mdl[name];
}

/*
/модули
*/



module.exports = FEN;