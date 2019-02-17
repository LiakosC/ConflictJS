window.onkeydown = function(event) {
	var code = event.keyCode || event.which;
	if (code == "13") {
		if (html.login_page.style.display == "block") {
			if (pop.opened) {
				pop.close();
			} else {
				login.KP13();
			}
		} else if (html.chs_page.style.display == "block") {
			if (pop.opened) {
				pop.close();
			} else {
				chs.KP13();
			}
		} else if (html.game_page.style.display == "block") {
			if (chat.inputOpen) {chat.send(); chat.closeInput();}
			else {chat.openInput();}
		}
	} else if (code == "47") {
		if (!chat.inputOpen) {chat.openInput(); chat.inputElement.value = "/";}
	} else if (code == "27") { // escape
		if (chat.inputOpen) {
			chat.closeInput();
		}
		else {
			if (MENU.obj.style.display == "none") {
				MENU.open();
			}
			else {
				MENU.close();
			}
		}
	}
}
window.onmousemove = function(event) {
	//chat.log(event.clientX);
	login_music.onmousemove(event);
}
window.onmouseup = function(event) {
	login_music.onmouseup(event);
}
