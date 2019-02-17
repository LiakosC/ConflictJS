
var main = {};
main.start = function() {
	$("#main")[0].innerHTML = '\
		<center>\
			</br>\
			<div class="conflictjs">ConflictJS</div>\
			</br></br>\
			<div class="form_div" id="login_form">\
				<div class="title">Login</div>\
				<input name="name" type="text" placeholder="Name"/><br>\
				<input name="ip" type="text" placeholder="IP" value=""/><br>\
				<div class="remember_div sh" style="text-align:left;">\
				</div>\
				<button id="login_button">Login</button>\
				<div id="loginMessage" class="msg"></div>\
			</div>\
			<div style="position:absolute; right:'+win.xtocX(10)+'%; bottom:'+win.xtocY(10)+'%; width:'+win.xtocX(40)+'%; height:'+win.xtocY(40)+'%;">\
				<button class="optionsButton"></button>\
			</div>\
			<div class="copyright">Copyright &copy; Conflict</div>\
		</center>\
	';
	$("#login_form input")[1].value = DEFAULT_IP;
	if (main.callback != null) {main.callback();}
	$("#login_button")[0].onclick = function() {
		main.login($("#login_form input")[0].value, $("#login_form input")[1].value);
	};
	$("#main .optionsButton")[0].onclick = function() {
		options.toggle();	
	};
	sp.music.main.play();
};
main.shutdown = function() {
	$("#main")[0].innerHTML = "";
	sp.music.main.stop();
};
main.login = function(name, ip) {
	client = new NodeClient("ws://" + ip + ":" + PORT);
	console.log(client.url);
	client.io.off("error");
	client.io.on("error", function(data) {client.report(data);});
	client.io.off("connect_error");
	client.io.on("connect_error", function(str) {
		$("#loginMessage")[0].innerHTML = "Connection error.";
	});
	client.io.off("connect");
	client.io.connect();
	client.io.on("connect", function() {
		client.report("logging with name " + name);
		client.io.emit("login", {name: name});
		client.io.off("login response");
		client.io.on("login response", function(json) {
			report("login response" + JSON.stringify(json));
			if (json.ok) {
				game.worldKey = json.worldKey;
				main.shutdown();
				game.start();
				report("logged in");
			} else {$("#loginMessage")[0].innerHTML = json.msg;}
		});
	});
};





