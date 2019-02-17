var pop = {};
pop.create = function() {
	pop.div = $("#pop")[0];
	pop.div.style.display = "none";
	pop.div.innerHTML = '\
	<div>\
		<div class="msg"></div>\
		<div class="btn"></div>\
	</div>';
	pop.enterCallback = function() {}
}

pop.open = function(message_html, buttons_html) { // returns all buttons in array
	pop.div.style.display = "block"; 
	$("#pop .msg")[0].innerHTML = message_html;
	$("#pop .btn")[0].innerHTML = buttons_html;
	return $("#pop .btn")[0].getElementsByTagName("button");
}
pop.close = function() {
	pop.div.style.display = "none"; 
	$("#pop .msg")[0].innerHTML = "";
	$("#pop .btn")[0].innerHTML = "";
}


/*
<div id="debug_buttons">
	<div><button onclick="html.openParaID('login_page');">Login Page</button></div>
	<div><button onclick="html.openParaID('chs_page');">Characters Page</button></div>
	<div><button onclick="loading_div.show();">Loading Page</button></div>
	<div><button onclick="html.openParaID('game_page');">Game Page</button></div>
	<div><button onclick="ws.connect();">ws.connect();</button></div>
	<div><button onclick="var gui = require('nw.gui'); gui.Window.get().showDevTools();">Console</button></div>
</div>
*/