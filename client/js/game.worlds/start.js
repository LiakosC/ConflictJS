
game.worlds["start"] = {};
game.worlds["start"].name = "Village";
game.worlds["start"].preload = function() {
	game.ph.load.spritesheet("things/flame", GRAPHICS_ROOT + "/things/flame/idle.png", 50, 50, 4);
	game.ph.load.image("house", GRAPHICS_ROOT + "/buildings/house/texture.png");
	game.ph.load.image("stable", GRAPHICS_ROOT + "/buildings/stable/texture.png");
	game.ph.load.image("spider", GRAPHICS_ROOT + "/units/spider1/texture.png");
	game.ph.load.spritesheet("spider_move", GRAPHICS_ROOT + "/units/spider1/move.png", 450/5, 430/5, 25);
	game.ph.load.spritesheet("spider_attack1.png", GRAPHICS_ROOT + "/units/spider1/attack1.png", 515/5, 480/5, 25);
	
};
game.worlds["start"].create = function() {
	game.ph.world.setBounds(0, 0, 1620, 1620);
	game.createTerrain(0, 0, game.ph.world.width, game.ph.world.height, "terrain/grass_1");
	//game.createPortal(0, 300, 300);
	//var s = game.ph.add.sprite(100, 100, "flame");
	//s.animations.add(0)
	//s.animations.play(0, 7, true);
	//game.decorationGroup.add(s);
	//for (var i=0; i<100; i++) {
	//}
	
	//$("#loadingBox")[0].classList.add("off");
	
	//var u = new game.Unit("hero");
	//u.moveInstantlyToXY(50, 50);
	//game.addUnit(0, u);
	
	//var s = game.ph.add.sprite(40, 40, "hero");
	//game.unitsGroup.add(s);
	//select("flame").put(2359, 2499).play(7);
	//select("house").put(2359, 2299).root().
	//select("stable").put(2725, 2662).root();
	//game.create_portal("Sand Prison", "forest", 210, 250, 1966, 2851);
};
game.worlds["start"].update = function() {
	//for (var i=0; i<20; i++) {
	//	game.createPortal(0, 150, 150);
	//	game.things.portals[0].destroy();
	//}
};