game.me = {};
game.me.json_str = undefined;
game.me.exist = function() {if (typeof game.me.unit !== 'undefined') {return true;} else {return false;}}
game.me.xyClock 	= undefined;
game.me.moveToPointEffect = undefined;
game.me.create = function(unit, json) {
	hud.start();
	//analyze(game.ph.physics.p2);
	game.me.unit = unit;
	//alert(JSON.stringify(json.spells));
	//unit.hpBar.hide();
	//unit.nameLabel.visible = false;
	game.ph.camera.follow(unit.sprite);
	hud.myWindow.renderUnit(unit);
	client.io.emit("loadWorld");
	game.me.xyClock = game.ph.time.create();
	game.me.xyClock.loop(500, function() {
		if (game.me.exist()) {client.io.emit("xy", {x: game.me.unit.sprite.x, y: game.me.unit.sprite.y});}
	}); //game.ph.time.events.add(4000, function() {});
}
game.me.stoping = function() {
	var x = game.me.unit.sprite.x, y = game.me.unit.sprite.y;
	client.io.emit("stoping", {x: x, y: y});
	client.io.emit("xy", {x: x, y: y});
	//ws.send("/stoping "+x+" "+y+"<#>"+"/xy "+x+" "+y);
	game.me.xyClock.stop(false);
}
game.me.moving = function(x, y) {
	if (game.me.unit.alive) {
		game.me.unit.moveToPoint(x, y);
		game.me.moveToPointEffect = game.ph.add.sprite(x, y, "move_to_point");
		game.me.moveToPointEffect.anchor.setTo(0.5, 0.5);
		game.me.moveToPointEffect.animations.add(0);
		game.me.moveToPointEffect.animations.play(0, 15, false, true);
		var x0 = game.me.unit.sprite.x, y0 = game.me.unit.sprite.y;
		client.io.emit("moving", {x0: x0, y0: y0, x: x, y: y});
		//ws.send("/moving "+x0+" "+y0+" "+x+" "+y+"<#>"+"/xy "+x0+" "+y0);
		game.me.xyClock.start();
	} else {game.error("Can't move while dead");}
}
game.me.dying = function() {
	game.me.alive = false;
	hud.death.startTimer(10);
}
game.me.reviving = function() {
	hud.death.hide();
	game.me.alive = true;
}
game.me.spells = {
	spells: {},
	freezeAll: function() {for (var key in game.me.spells.spells) {game.me.spells.spells[key].freeze();}},
	unfreezeAll: function() {for (var key in game.me.spells.spells) {game.me.spells.spells[key].unfreeze();}},
	removeAll: function() {
		for (var key in game.me.spells.spells) {
			var s = game.me.spells.spells[key];
			s.remove();
		}
	},
	createSpells: function(array) {
		for (var i=0; i<array.length; i++) {new Spell(array[i]);}
	}
};
game.me.terrain_leftClick = function() {
	game.me.diselect();
}
game.me.terrain_rightClick = function() { // when rightClicking yourself too
	if (typeof game.me.unit !== 'undefined') {
		game.me.moving(game.ph.input.worldX, game.ph.input.worldY);
	}
}
game.me.selectedUnit = null;
game.me.diselect = function() {
	for (var key in game.units) {
		game.units[key].select.diselect();
	}
	game.me.selectedUnit = null;
	hud.targetWindow.close();
}