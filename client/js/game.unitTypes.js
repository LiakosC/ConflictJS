

game.unitTypes = {};
game.unitTypes.hero		= {name:"Hero",	scale:1};
game.unitTypes.hero.model = function(/*Model*/ model) {
	model.sprites.texture.scale.setTo(0.85);
	model.sprites.texture.loadTexture("units/hero/move", 0);
	model.animations.move = model.sprites.texture.animations.add("move", null, 30, true);
	model.effects.idle = new ModelEffect();
	model.effects.idle.onStart = function() {
		model.sprites.texture.loadTexture("units/hero/texture");
	};
	model.effects.idle.onEnd = function() {
		
	};
	model.effects.move = new ModelEffect();
	model.effects.move.onStart = function() {
		if (!model.effects.move.playing) {
			model.sprites.texture.loadTexture("units/hero/move");
			model.animations.move.play();
		}
	};
	model.effects.move.onEnd = function() {
		
	};
	model.sprites.texture.loadTexture("units/hero/texture");
};