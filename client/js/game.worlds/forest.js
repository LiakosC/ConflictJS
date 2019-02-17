
game.worlds.forest = {};
game.worlds["forest"].preload = function() {
	game.ph.load.image("sand", "graphics/terrain/sand1.png");
}
game.worlds["forest"].create = function() {
	game.ph.world.setBounds(0, 0, 500, 500);
	game.createTerrain(0, 0, game.ph.world.width, game.ph.world.height, "sand");
	
	//b.group(game.terrainGroup);
	//b.select("terrain/sand1.png").rect(0, 0, 500, 500);
	//game.create_portal("Village", "start", 2034, 2803, 400, 400);
}