var socket = new WebSocket("wss:elyxisocket-chat-app.herokuapp.com/:8081");

socket.onopen = openSocket;
socket.onmessage = showData;

opened = false;
loaded = false;
named = false

var msg = ""

window.onload = function(){	// The socket connection needs two event listeners:

	text = document.getElementById("sensor-reading");
	text.innerHTML = msg;
	loaded = true;

}

function openSocket() {

	opened = true;
	
}

var intervalID = window.setInterval(keepAlive, 50000/4);

function keepAlive() {
	socket.send("#IGNORE#");
}

/*
showData(), below, will get called whenever there is new data
from the server.
*/

function showData(result) {
	// when the server returns, show the result in the div:
	msg = result.data;
	if(loaded && msg != "#IGNORE#"){
		linebreak = document.createElement("br");
		text.appendChild(linebreak);
		text.innerHTML = text.innerHTML + msg;
	}
}

function send(){
	if(can_send){
		socket.send(document.getElementById("name").value + ": " + document.getElementById("inp").value);
	}
	document.getElementById("inp").value = "";
}

function send_name(){
	if(!named){
		socket.send(document.getElementById("name").value + " joined.");
	}
	named = true;
	can_send = true;
}
