/*
.start() and .shutdown() must be perfectrly called
*/

var game = {};
game.start = function() {
	$("#main")[0].innerHTML = '\
		<div id="gameBox" style="position:absolute; right:'+win.xtocX(5)+'%; top:'+win.xtocY(5)+'%; width:'+win.xtocX(CANVAS_WIDTH)+'%; height:'+win.xtocY(CANVAS_HEIGHT)+'%;">\
			<div id="canvasBox" style="position:absolute; left:0%; top:0%; width:100%; height:100%;"></div>\
			<div id="loadingBox" class="EpicLoading"></div>\
		</div>\
		<div id="UnitWindow0" class="UnitWindow"></div>\
		<div id="UnitWindow1" class="UnitWindow"></div>\
		<div id="WarMinimap" class="WarMinimap"></div>\
		<div class="minimapButtons">\
			<button class="optionsButton"></button>\
		</div>\
		<div class="spellsBox">\
			\
		</div>\
		<div id="WarChat" class="WarChat"></div>\
		\
	';
	
	$("#main")[0].style.cursor = "default";
	$("#canvasBox")[0].style.cursor = "pointer";
	
	
	game.ph = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.CANVAS, "canvasBox");
	game.ph.state.add("boot", game.boot.state);
	game.ph.state.add("world", game.worldState);
	game.ph.state.start("boot");
	
	game.unitWindow = [
		new UnitWindow($(".UnitWindow")[0]),
		new UnitWindow($(".UnitWindow")[1])
	];
	game.unitWindow[1].toggle(false);
	
	// minimap
	
	$("button.optionsButton")[0].onclick = function() {
		sp.effects.gui_buttonClick.play();
		options.toggle();
	};
	
	game.chat = new egui.WarChat($("#WarChat")[0]);
	
	game.epicLoading = new egui.EpicLoading($("#loadingBox")[0]);
	game.epicLoading.setComment("Loading ...");
	
	var spellsBox = $(".spellsBox")[0];
	var html = "";
	for (var i=0; i<10; i++) {
		html += '<div class="slot"></div>';
	}
	spellsBox.innerHTML = html;
	
	client.io.off("disconnect");
	client.io.on("disconnect", function() {
		game.shutdown();
		main.start();
		$("#loginMessage")[0].innerHTML = "Connection lost.";
	});
	
	sp.music.game.play();
};
game.shutdown = function() {
	$("#main")[0].innerHTML = "";
	game.ph.destroy();
	game.unitWindow[0].destroy();
	game.unitWindow[1].destroy();
	game.chat.destroy();
	game.epicLoading.destroy();
	sp.music.game.stop();
};











game.worldState = { // first a world is selected (game.world), then this state runs
	create: function() {
		report("create() worldState");
		game.boot.load_keys();
		if (game.worlds[game.worldKey] != null) {
			
			game.megaCamera = new PhaserZoomCamera(game.ph.camera);
			game.megaCamera.setBounds(500, 500, 500, 500);
			
			game.units = {};
			game.portals = {};
			
			game.terrainGroup 	= game.ph.add.group();
			game.portalsGroup		= game.ph.add.group();
			game.decorationGroup	= game.ph.add.group();
			game.mtpGroup			= game.ph.add.group(); // move_to_point effect
			game.unitsGroup 		= game.ph.add.group();
			
			game.mtpSprite = game.ph.add.sprite(0, 0, "effects/move_to_point/idle");
			game.mtpSprite.anchor.setTo(0.5);
			game.mtpSprite.scale.setTo(0.8);
			game.mtpSprite.animations.add("idle", null, 10, false);
			game.mtpSprite.kill();
			game.mtpGroup.add(game.mtpSprite);
			
			
			if (game.worlds[game.worldKey].create != null) {game.worlds[game.worldKey].create();}
			
			worldCallback();
			
			
			
			// CREATE CLIENT
			var waraction = new WarAction();
			waraction.shadowDelay = 500;
			waraction.autoShadowDelay = true;
			waraction.serverTimeKey = "t";
			waraction.play = function(json) {
				if (NodeClient.filter(json, "unit_angle", ["key", "angle"])) {
					var data = json.unit_angle;
					if (game.units[data.key] != null) {
						game.units[data.key].setAngle(data.angle);
					}
				} else  if (NodeClient.filter(json, "unit_mv_ease", ["key", "x", "y"])) {
					var data = json.unit_mv_ease;
					//report("waraction unit_mv_ease");
					if (game.units[data.key] != null) {
						game.units[data.key].moveWalkingToXY(data.x, data.y, client.serverDelta);
					} else {
						report("unitNodeClient.objectHasKeysmv_ease: unit not found. requesting unit");
						client.io.emit("request_unit", {key: data.key});
					}
				} else if (NodeClient.filter(json, "unit_mv_stop", ["key", "x", "y"])) {
					var data = json.unit_mv_stop;
					//report("waraction unit_mv_stop");
					if (game.units[data.key] != null) {
						game.units[data.key].stopMoving(data.x, data.y);
					} 				
				} else if (NodeClient.filter(json, "unit_xy", ["key", "x", "y"])) {
					var data = json.unit_xy;
					if (game.units[data.key] != null) {
						var angle = data.angle || null;
						game.units[data.key].setXY(data.x, data.y, angle);
					}
				} else if (NodeClient.filter(json, "unit_tele_out", ["key"])) {
					
				} else if (NodeClient.filter(json, "unit_tele_in", ["key", "x", "y"])) {
					
				} else if (NodeClient.filter(json, "unit", ["key", "code", "name", "r", "x", "y", "angle"])) {
					var data = json.unit;
					if (game.units[data.key] != null) {game.removeUnit(game.units[data.key]);}
					var u = new game.Unit(data.code);
					u.setName(data.name);
					u.r = data.r;
					u.setXY(data.x, data.y, data.angle);
					game.addUnit(data.key, u);
					if (data.key == game.heroKey) {
						game.setUnitAsHero(game.units[data.key]);	
					}
				} else if (NodeClient.filter(json, "rm_unit", [])) {
					var data = json.rm_unit;
					if (game.units[data.key] != null) {
						game.removeUnit(game.units[data.key]);
					} else {fatal("removing empty unit in rm_unit");}
				} else if (NodeClient.filter(json, "portal", ["key", "x", "y"])) {
					var data = json.portal;
					if (game.portals[data.key] == null) {
						game.createPortal(data.key, data.x, data.y);	
					}
				} else if (NodeClient.filter(json, "me", [])) {
					var data = json.me;
					report("Setting game.heroKey = " + data.unit.key);
					game.heroKey = data.unit.key;
				} else if (NodeClient.filter(json, "world", ["key", "name"])) { // check this condition last because it reloads the world
					var data = json.world;
					// if the server sends world, only reload if world is different
					if (json.world.key != game.worldKey) {
						game.loadWorld(data.key);
					}
				}
			};
			
			client.io.off("game"); // for safety. also called in state shutdown
			client.io.on("game", function(json) {
				/*
				{t: time, type: {} } 
				*/
				waraction.receive(json);
			});
			client.io.on("pong", function() {
				//console.log("pong");
			});
			// CREATE CLIENT
			
			console.log("Requesting All");
			client.io.emit("request_all");
			game.epicLoading.setComment("Completed!");
			setTimeout(function() {game.epicLoading.toggle(false);}, LOADING_CLOSE_INTERVAL);
		} else {debug("world null in create");}
	}, update: function() {
		if (game.worlds[game.worldKey] != null) {
			if (game.worlds[game.worldKey].update != null) {game.worlds[game.worldKey].update();}
		} else {debug("world "+game.worldKey+" null in update");}
	}, shutdown: function() {
		client.io.off("game");
	}
};





game.worldKey = "";
game.heroKey = -1;
game.loadWorld = function(worldKey) {
	report("Loading world " + worldKey);
	if (game.worlds[worldKey] != null) {
		game.worldKey = worldKey;
		game.ph.state.start("world");
	} else {fatal("world " + worldKey + " does not exist in .loadWorld(worldKey)");}
};
game.addUnit = function(key, unit) {
	report("adding unit with key " + key);
	//debug(key);
	unit.key = key;
	game.units[key] = unit;
};
game.removeUnit = function(unit) {
	report("removing unit with key " + unit.key);
	if (unit == null) {fatal("removing null unit");}
	unit.destroy();
	delete game.units[unit.key];
};
game.setUnitAsHero = function(unit) {
	report("Setting hero unit with key " + unit.key);
	game.heroUnit = unit;
	game.ph.camera.follow(unit.pointSprite);
	game.unitWindow[0].setName(unit.name);
	game.unitWindow[0].setHealth(unit.hp, unit.hpMax);
};
game.selectUnit = function(unit) {
	if (game.selectedUnit != null) {game.selectedUnit.diselect();}
	unit.select();
	game.selectedUnit = unit;
	game.unitWindow[1].toggle(true);
	game.unitWindow[1].setName(unit.name);
	game.unitWindow[1].setHealth(unit.hp, unit.hpMax);
};
game.diselect = function() {
	if (game.selectedUnit != null) {game.selectedUnit.diselect();}
	game.unitWindow[1].toggle(false);
};
game.createTerrain = function(x, y, w, h, texture) {
	var tile = game.ph.add.tileSprite(x, y, w, h, texture);
	tile.inputEnabled = true;
	tile.events.onInputDown.add(function(sprite, pointer) {
		if (pointer.leftButton.isDown) {
			game.leftClickTerrain();
		} else if (pointer.rightButton.isDown) {
			game.rightClickTerrain();
		}
	});
	game.terrainGroup.add(tile);
};
game.leftClickUnit = function(unit) {
	game.selectUnit(unit);
};
game.rightClickUnit = function(unit) {
	game.rightClickTerrain();
};
game.leftClickTerrain = function() {
	game.diselect();
};
game.rightClickTerrain = function() {
	var x = game.megaCamera.mouseWorldX();
	var y = game.megaCamera.mouseWorldY();
	game.mtpSprite.reset(x, y);
	game.mtpSprite.animations.stop("idle");
	game.mtpSprite.animations.play("idle", null, false, true);
	client.io.emit("cast_moveToXY", {x: x, y: y});
};
game.createPortal = function(key, x, y) {
	var portal = new game.Thing();
	portal.pointSprite.x = x;
	portal.pointSprite.y = y;
	game.portalsGroup.add(portal.pointSprite);
	portal.model.sprites.texture.loadTexture("things/portal/idle");
	portal.model.animations.idle = portal.model.sprites.texture.animations.add("idle", null, 7, true);
	portal.model.animations.idle.play();
	portal.onRightClick = function() {
		game.rightClickTerrain();
	};
	game.portals[key] = portal;
};
game.removePortal = function(portal) {
	// key?
};

