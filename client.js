var socket = new WebSocket("wss:elyxisocket-chat-app.herokuapp.com/:8081");

socket.onopen = openSocket;
socket.onmessage = showData;

opened = false;
loaded = false;

var msg = ""

window.onload = function(){	// The socket connection needs two event listeners:

	text = document.getElementById("sensor-reading");
	text.innerHTML = msg;
	loaded = true;

}

function openSocket() {

	opened = true;
	
}

/*
showData(), below, will get called whenever there is new data
from the server.
*/

function showData(result) {
	// when the server returns, show the result in the div:
	msg = result.data;
	if(loaded){
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
	socket.send(document.getElementById("name").value + " joined.");
	can_send = true;
}
