

game.worldState.preload = function() {
	game.epicLoading.toggle(true);
	
	game.ph.load.spritesheet("effects/move_to_point/idle", GRAPHICS_ROOT + "/effects/move_to_point/idle.png", 240/8, 30/1, 8);
	
	game.ph.load.image("units/hero/texture", GRAPHICS_ROOT + "/units/hero/texture.png");
	game.ph.load.spritesheet("units/hero/move", GRAPHICS_ROOT + "/units/hero/move.png", 375/5, 325/5, 25);
	game.ph.load.spritesheet("units/hero/attack_1", GRAPHICS_ROOT + "/units/hero/attack1.png", 935/5, 585/5, 25);
	game.ph.load.spritesheet("units/hero/attack_2", GRAPHICS_ROOT + "/units/hero/attack2.png", 850/5, 415/5, 25);
	
	game.ph.load.image("terrain/grass_1", GRAPHICS_ROOT + "/terrain/grass1.png");
	game.ph.load.image("terrain/dirt_1", GRAPHICS_ROOT + "/terrain/dirt1.png");
	game.ph.load.image("terrain/sand_1", GRAPHICS_ROOT + "/terrain/sand1.png");
	game.ph.load.image("terrain/sand_2", GRAPHICS_ROOT + "/terrain/sand2.png");
	game.ph.load.image("terrain/scortched_1", GRAPHICS_ROOT + "/terrain/scortched1.png");
	
	game.ph.load.spritesheet("things/portal/idle", GRAPHICS_ROOT + "/things/portal/idle.png", 500/5, 100/1, 5);
	
	if (game.worlds[game.worldKey] != null) {
		if (game.worlds[game.worldKey].preload != null) {game.worlds[game.worldKey].preload();}
	} else {debug("world "+game.worldKey+" null in preload");}
};