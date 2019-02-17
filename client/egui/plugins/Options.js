/*
31/8/17

var options = new egui.Options(containerElement, key_of_localStorage=="options");
options.onFullscreenChange = function(flag) {

}
options.onLogoutClick = function() {

}
options.load();
*/

egui.Options = function(container, localStorageKey) {
	egui.EGUIObject.call(this, container);
	var THIS = this;
	var key = localStorageKey;
	
	this.container.classList.remove("egui-Options");
	this.container.classList.add("egui-Options");
	
	//this.container.classList.add("animated", "bounceInRight");
	this.container.innerHTML = '\
		<div class="egui-Options-title">OPTIONS</div>\
		<div class="egui-Options-inner"></div>\
		<div class="egui-Options-bottom"></div>\
	';
	this.html_titleDiv = this.container.querySelectorAll(".egui-Options-title")[0];
	this.html_innerDiv = this.container.querySelectorAll(".egui-Options-inner")[0];
	this.html_bottomDiv = this.container.querySelectorAll(".egui-Options-bottom")[0];
	
	this.onOpen = function() { // overwrite basic method
	//	egui.Options.SOUND.play();
		this.runMenu_main();
	};
	this.onClose = function() { // overwrites basic method
	//	egui.Options.SOUND.play();
	};
	
	this.runMenu_main = function() {
		this.html_innerDiv.innerHTML = '\
			<div><label>Fullscreen<input type="checkbox"/></label></div>\
			<div><button>Sound</button>\
			<div><button>Logout</button>\
		';
		
		this.html_bottomDiv.innerHTML = '\
			<button>Close</button>\
		';
		this.html_fullscreenCheckbox = this.html_innerDiv.querySelectorAll("input")[0];
		this.html_soundButton = this.html_innerDiv.querySelectorAll("button")[0];
		this.html_logoutButton = this.html_innerDiv.querySelectorAll("button")[1];
		this.html_closeButton = this.html_bottomDiv.querySelectorAll("button")[0];
		
		this.html_fullscreenCheckbox.checked = this.data_fullscreen;
		
		this.html_fullscreenCheckbox.onclick = function() {
			if (egui.Options.SOUND != null) egui.Options.SOUND.play();
			THIS.data_fullscreen = THIS.html_fullscreenCheckbox.checked;
			//THIS.save(); // dont save fullscreen at the next time. it's ugly
			if (THIS.onFullscreenChange != null) {
				THIS.onFullscreenChange(THIS.html_fullscreenCheckbox.checked);
			}
		};
		this.html_soundButton.onclick = function() {
			if (egui.Options.SOUND != null) egui.Options.SOUND.play();
			THIS.runMenu_sound();
		};
		this.html_logoutButton.onclick = function() {
			if (egui.Options.SOUND != null) egui.Options.SOUND.play();
			if (THIS.onLogoutClick != null) {
				THIS.onLogoutClick();
			}
		};
		this.html_closeButton.onclick = function() {
			if (egui.Options.SOUND != null) egui.Options.SOUND.play();
			THIS.toggle(false);
		};
	};
	
	this.runMenu_sound = function() {
		this.html_innerDiv.innerHTML = '\
			<div><label>Master Volume</label></div>\
			<div class="master_volume"></div>\
			<div><label>Music Volume</label></div>\
			<div class="music_volume"></div>\
			<div><label>Effects Volume</label></div>\
			<div class="effects_volume"></div>\
		';
		this.html_bottomDiv.innerHTML = '\
			<button>Back</button>\
		';
		this.html_masterVolumeBar = new egui.Slidebar(this.html_innerDiv.querySelectorAll(".master_volume")[0]);
		this.html_masterVolumeBar.set(this.data_masterVolume);
		this.html_masterVolumeBar.onChange = function(perc /* 0-100 */) {
			THIS.data_masterVolume = perc;
			egui.Options.onMasterVolumeChange(THIS.data_masterVolume);
			THIS.saveAsync();
		}
		this.html_musicVolumeBar = new egui.Slidebar(this.html_innerDiv.querySelectorAll(".music_volume")[0]);
		this.html_musicVolumeBar.set(this.data_musicVolume);
		this.html_musicVolumeBar.onChange = function(perc /* 0-100 */) {
			THIS.data_musicVolume = perc;
			egui.Options.onMusicVolumeChange(THIS.data_musicVolume);
			THIS.saveAsync();
		}
		this.html_effectsVolumeBar = new egui.Slidebar(this.html_innerDiv.querySelectorAll(".effects_volume")[0]);
		this.html_effectsVolumeBar.set(this.data_effectsVolume);
		this.html_effectsVolumeBar.onChange = function(perc /* 0-100 */) {
			THIS.data_effectsVolume = perc;
			egui.Options.onEffectsVolumeChange(THIS.data_effectsVolume);
			THIS.saveAsync();
		}
		this.html_backButton = this.html_bottomDiv.querySelectorAll("button")[0];
		this.html_backButton.onclick = function() {
			if (egui.Options.SOUND != null) egui.Options.SOUND.play();
			THIS.runMenu_main();
		};
	};
	
	this.onFullscreenChange = function(flag) {};
	this.onLogoutClick = function() {};
	
	this.saveAsyncTimeout = null;
	this.saveAsync = function() {
		if (this.saveAsyncTimeout != null) {clearTimeout(THIS.saveAsyncTimeout);}
		this.saveAsyncTimeout = setTimeout(function() {
			THIS.save();
			clearTimeout(THIS.saveAsyncTimeout);
		}, 500);
	};
	this.save = function() {
		var json = {
			fullscreen: THIS.data_fullscreen,
			effectsVolume: THIS.data_effectsVolume,
			musicVolume: THIS.data_musicVolume,
			masterVolume: THIS.data_masterVolume
		};
		if (egui.Options.INFORM_SAVING) console.log("egui.Options saved..", json);
		var disk = JSON.stringify(json);
		localStorage[key] = disk;
	};
	
	this.load = function() {
		var disk = localStorage[key];
		this.data_fullscreen = true;
		try {
			var json = JSON.parse(disk);
			this.data_effectsVolume = json.effectsVolume;
			this.data_musicVolume = json.musicVolume;
			this.data_masterVolume = json.masterVolume;
		} catch (e) {
			console.log("egui.Options cant parse data at loading");
			var json = {};
			this.data_effectsVolume = 100;
			this.data_musicVolume = 100;
			this.data_masterVolume = 100;
		}
	};
	console.log("local", localStorage[key]);
	
	//this.load(); let the user use it
	console.log("local", localStorage[key]);
	
	
};
egui.Options.prototype = Object.create(egui.EGUIObject.prototype);
egui.Options.prototype.constructor = egui.Options;

/* SPECIFIC */

egui.Options.INFORM_SAVING = true;
egui.Options.SOUND = sp.effects.gui_buttonClick;
egui.Options.SOUND = null;

egui.Options.onMusicVolumeChange = function(vol /*0-100*/) {
	sp.musicGroup.setVolume(vol/100);
};
egui.Options.onEffectsVolumeChange = function(vol /*0-100*/) {
	sp.effectsGroup.setVolume(vol/100);
};
egui.Options.onMasterVolumeChange = function(vol /*0-100*/) {
	Howler.volume(vol/100);
};


	