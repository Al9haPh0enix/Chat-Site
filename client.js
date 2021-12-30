var socket = new WebSocket("wss:elyxisocket-chat-app.herokuapp.com/:8081");

socket.onopen = openSocket;
socket.onmessage = showData;

opened = false;
loaded = false;
named = false

var msg = ""
var uname = ""

window.onload = function(){	// The socket connection needs two event listeners:

	text = document.getElementById("sensor-reading");
	text.innerHTML = msg;
	loaded = true;

}

window.onbeforeunload = function(){
	if(document.getElementById("name").value != uname){
		document.getElementById("name").value = uname
	}
	if(can_send){
		socket.send(document.getElementById("name").value + " disconnected.");
	}
 }

function openSocket() {

	opened = true;
	
}

var intervalID = window.setInterval(keepAlive, 12500);

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
		text.innerHTML = text.innerHTML + msg;
		linebreak = document.createElement("br");
		text.appendChild(linebreak);
		
	}
}

function send(){
	if(document.getElementById("name").value != uname){
		document.getElementById("name").value = uname
	}
	if(can_send){
		socket.send(document.getElementById("name").value + ": " + document.getElementById("inp").value);
	}
	document.getElementById("inp").value = "";
}

function send_name(){
	if(!named){
		uname = document.getElementById("name").value
		socket.send(uname + " joined.");
	}
	if(named){
		document.getElementById("name").value = uname
	}
	named = true;
	can_send = true;
}
