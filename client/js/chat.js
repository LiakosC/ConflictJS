var chat = {
	logElement: document.getElementById("log"),
	inputElement: document.getElementById("input"),
	maxRows: 25,
	inputOpen: false,
	openInput: function() {
		chat.inputElement.style.display = "block";
		chat.inputElement.focus();
		if (game.ph !== undefined) {game.ph.input.keyboard.enabled = false;}
		chat.inputOpen = true;
	},
	closeInput: function() {
		chat.inputElement.value = "";
		chat.inputElement.style.display = "none";
		if (game.ph !== undefined) {game.ph.input.keyboard.enabled = true;}
		chat.inputOpen = false;
	},
	log: function(str, className, isSafe) {
		if (typeof isSafe == 'undefined') {isSafe = true;}
		if (isSafe) {str = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');}
		className = className || "";
		chat.logElement.innerHTML += '<div class="'+className+'">'+str+'</div>';
		var divs = chat.logElement.getElementsByTagName("div");
		if (divs.length > chat.maxRows) {divs[0].parentNode.removeChild(divs[0]);}
		setTimeout(function() {chat.logElement.scrollTop = chat.logElement.scrollHeight;}, 1);
	},
	send: function() {
		var str = chat.inputElement.value;
		var first = str.charAt(0);
		var sections = str.split(" ");
		if (sections[0] == "/clear") {
			chat.clear();
		} else if (first == "/") {
			client.io.emit(chat.inputElement.value);
		} else if (chat.inputElement.value == "") {
			
		} else {client.io.emit("say", str);}
	},
	clear: function() {
		chat.logElement.innerHTML = "";
	}
};