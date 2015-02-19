/*
браузерный веб-сокет
*/

var ws_config = {
	host : "localhost",
	port : 5892,
};

var ws = new WebSocket("ws://" + ws_config.host + ":" + ws_config.port + "/");

ws.onopen = function() {
	console.log("Соединение с " + ws_config.host + " установлено.");
};

ws.onclose = function(event) {
	if (event.wasClean) {
		console.log("Соединение с " + ws_config.host + " закрыто чисто");
	} else {
		console.log("Обрыв соединения");
	}
	console.log("Код: " + event.code + " причина: " + event.reason);
};

ws.onmessage = function(event) {
	console.log("Получены данные " + event.data);
	showMessage(event.data);
};

ws.onerror = function(error) {
	console.log("Ошибка " + error.message);
};

function showMessage(message) {
	var messageElem = document.createElement('div');
	messageElem.appendChild(document.createTextNode(message));
	document.getElementById('subscribe').appendChild(messageElem);
}

function setOnLoad() {
	document.getElementById('publish_btn').onclick = function() {
		ws.send(document.getElementById('message').value);
		return false;
	};
}