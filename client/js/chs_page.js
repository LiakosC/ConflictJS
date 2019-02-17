var chs = {};
chs.retrieve = function() {
	var data = client.getHttpHeader() + "&action=retrieve_chs";
	$("#heroeslist .inner")[0].innerHTML = "Loading characters ...";
	pop.open(); pop.msg("Retrieving characters ..."); pop.btn("Cancel", function() {pop.close();});
	$.post(HTTP_URL, data, function(str) {
		console.log("retrieving: " + str);
		$("#heroeslist .inner")[0].innerHTML = "";
		var json = JSON.parse(str);
		if (json.ok) { //json.chs = {"6":{"name":"Liakos"},"7":{"name":"Gsas"}}
			for (var playerID in json.chs) {
				chs.insertCharacter(playerID, json.chs[playerID].name);
			}
		}
		pop.close();
	});
}
chs.insertCharacter = function(playerID, name) {
	var box = $("#heroeslist .inner")[0];
	var html = '<div class="c">\
				<div class="name">'+name+'</div>\
				<div class="buttons">\
					<button onclick=\'chs.characterEnter('+playerID+');\'>Enter</button>\
					<button onclick=\'chs.sendDelete('+playerID+');\'>Delete</button>\
				</div>\
			</div>';
	box.innerHTML += html;
}
chs.sendDelete = function(playerID) {
	var data = client.getHttpHeader() + "&action=delete_ch&playerID="+playerID;
	console.log("sending delete: " + data);
	$.post(HTTP_URL, data, function(str) {
		console.log("retrieving the delete result: " + str);
		var json = JSON.parse(str);
		if (json.ok) {
			chs.retrieve();
		}
	});
}
chs.characterEnter = function(playerID) {
	client.playerID = playerID; // from null to playerID
	console.log("trying to enter with playerID: "+playerID);
	pop.open(); pop.msg("Connecting to server ..."); pop.btn("Cancel", function() {pop.close();});	
	client.connect(function() {
		var json = {email: client.email, password: client.password, wsCode: client.wsCode, playerID: client.playerID};
		client.io.emit("login", json);
		console.log("connected to ws");
		console.log("sending to ws: " + JSON.stringify(json));
		chat.log("Connected!");
		pop.open(); pop.msg("Logging In ..."); pop.btn("Cancel", function() {pop.close();});
	});
}
// ----------------------------------------------------------- //
chs.ch = {
	div:	$("#createhero")[0],
	open: function() {chs.ch.div.style.display = "block"; chs.ch.getInput().focus();},
	close: function() {chs.ch.div.style.display = "none";},
	toggle: function() {var o = chs.ch.div; if (o.style.display == "block") {chs.ch.close();} else {chs.ch.open();}},
	getInput: function() {return chs.ch.div.getElementsByTagName("input")[0];},
	msg_div: $("#createhero_msg")[0],
	create: function() {
		var data = client.getHttpHeader() + "&action=create_ch&name="+chs.ch.getInput().value;
		console.log("sending create_ch: " + data);
		$.post(HTTP_URL, data, function(str) {
			console.log("retrieving from create_ch: " + str);
			var json = JSON.parse(str);
			if (json.ok) {
				chs.retrieve();
				chs.ch.close();
				//json.chs = {"6":{"name":"Liakos"},"7":{"name":"Gsas"}}
			} else {
				pop.open(); pop.msg(json.error); pop.btn("OK", function() {pop.close();});	
			}
		});
	}
}
chs.KP13 = function() {
	if (document.activeElement == chs.ch.getInput()) {
		chs.ch.create();
	} else if (pop.opened) {
		pop.close();
	}
}