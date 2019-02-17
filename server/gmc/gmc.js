
//console.log("Requiring gmc.js");



gmc = {};
gmc.fatal = function(str) {console.log("FATAL: " + str); process.exit(1);}
gmc.debug = function(str) {console.log("DEBUG: " + str);}
gmc.report = function(str) {console.log("REPORT: " + str);}
gmc.g2 = require("./g2.js");
gmc.Player = require("./Player.js");
gmc.players = {};
gmc.World = require("./World.js");
gmc.worlds = {};
gmc.unitTypes = require("./unitTypes.js");
gmc.Thing = require("./Thing.js");
gmc.Portal = require("./Portal.js");
gmc.Unit = require("./Unit.js");
gmc.Spell = require("./Spell.js");

gmc.now = Date.now();
gmc.delta = 1000/20; // ms = 1000 / fps
gmc.deltacd = gmc.delta;
gmc.runtime = function(dt) {
	gmc.deltacd -= dt;
	if (gmc.deltacd < 0) {
		gmc.deltacd += gmc.delta;
		gmc.update(gmc.delta);
	}
};
gmc.update = function(delta) { // delta game update. delta = miliseconds
	for (var k in gmc.players) {
		gmc.players[k].client.emit("pong");
	}
	gmc.now = Date.now();
	for (var worldKey in gmc.worlds) {
		gmc.worlds[worldKey].deltaUpdate(delta);	
	}
	//console.log("Now: " + gmc.now);
	//gmc.dumpPlayers();
	//for (var playerKey in gmc.players) {
	//	gmc.players[playerKey].client.emit("game", {t: gmc.now, unit_full: gmc.players[playerKey].unit.fullPacket() });	
	//}
};

gmc.dumpPlayers = function() {
	for (var key in gmc.players) {
		console.log(key, gmc.players[key].dump());	
	}
};

gmc.createWorld = function(code) {
	var world = new gmc.World();
	world.key = code;
	gmc.worlds[code] = world;
	return world;
};

gmc.removeUnit = function(unit) {
	unit.destroy();
	if (unit.world != null && unit.key != null) {
		if (unit.key != null) {
			gmc.forEachWorldPlayer(unit.world, function(player) {
				player.client.emit("game", {rm_unit: {key: unit.key} });
			});
			gmc.report("Removing unit with key: " + unit.key);
			delete unit.world.units[unit.key];
			if (unit.player != null) {unit.player.unit = null;}		
		} else {gmc.fatal("removing unit with NULL key");}
	} else {gmc.fatal("removing unit with NULL world");}	
};
gmc.teleportUnit = function(unit, world, x, y) {
	gmc.report("teleportUnit world.key="+world.key);
	//gmc.report("Teleporting unit " + unit.key);
	if (unit.world == world) {
		//gmc.report("Teleporting to SAME world");
		unit.setXY(x, y);
		gmc.forEachWorldPlayer(unit.world, function(player) {
			player.client.emit("game", {t: gmc.now, unit_xy: {key: unit.key, x: unit.x, y: unit.y} });
		});
	} else {
		delete unit.world.units[unit.key];
		gmc.forEachWorldPlayer(unit.world, function(player) {
			player.client.emit("game", {t: gmc.now, rm_unit: {key: unit.key} });
		});
		var i = 0; while (world.units[i] != undefined) {i++;}
		world.units[i] = unit;
		unit.key = i;
		unit.world = world;
		gmc.forEachWorldPlayer(unit.world, function(player) {
			player.client.emit("game", {t: gmc.now, unit: unit.packet()});
		});
		if (unit.player != null) {
			unit.player.client.emit("game", {t: gmc.now, world: unit.world.packet()});	
		}
	}
};
gmc.forEachWorldPlayer = function(world, callback) { // callback(player) {}
	for (var k in gmc.players) {
		if (gmc.players[k].unit != null) {
			if (gmc.players[k].unit.world == world) {
				callback(gmc.players[k]);
			}
		}
	}
};


module.exports = gmc;
