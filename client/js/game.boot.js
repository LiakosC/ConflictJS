

game.boot = {
	callback: function() {},
	setCursor: function(path) {document.body.style.cursor = path;},
	DEFAULT_CURSOR: "url('graphics/cursor.png'), auto",
	state: { // state starts
		init: function() {
			//window.oncontextmenu = function() {return false;};
			var ph = game.boot.state.game;
			ph.stage.disableVisibilityChange = true;
			ph.stage.backgroundColor = "#907CB2";
			game.boot.setCursor(game.boot.DEFAULT_CURSOR);
			//ph.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
			//ph.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
			//ph.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
			ph.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // the best to scale up with fullscreen
			//ph.scale.fullScreenScaleMode = Phaser.ScaleManager.USER_SCALE;
		},
		preload: function() {
		
		},
		create: function() {
			game.ph.time.desiredFps = FPS;
			game.boot.load_keys();
			if (game.boot.callback != null) {game.boot.callback();}
			game.ph.load.onFileComplete.add(function() {
				game.epicLoading.set(game.ph.load.progress / 100);
				//console.log("loading", game.ph.load.progress);
			});
		}
	}, // state ends
	keys: {},
	load_keys: function() {
		var ph = game.boot.state.game;
		
		game.boot.keys.fullscreen = ph.input.keyboard.addKey(Phaser.Keyboard.F10);
		game.boot.keys.fullscreen.onDown.add(function() {win.fullscreen();});
		
		//game.boot.enter = ph.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		//game.boot.enter.onDown.add(function() {pop.enterCallback();});
		
		//game.boot.keys.to_game = ph.input.keyboard.addKey(Phaser.Keyboard.G);
		//game.boot.keys.to_game.shiftKey = true;
		//game.boot.keys.to_game.onDown.add(function() {ph.state.start("game");});
		
		//game.boot.keys.to_menu = ph.input.keyboard.addKey(Phaser.Keyboard.M);
		//game.boot.keys.to_menu.shiftKey = true;
		//game.boot.keys.to_menu.onDown.add(function() {ph.state.start("menu");});
	}
};