

gmc = require("./gmc/gmc.js");

server = new (require("./NodeServer.js"))(9000);
console.log("Server Started @" + server.port);
server.io.on("connection", function(client) {
	console.log("ID [" + client.id + "] connected");
	client.on("login", function(json) {
		gmc.report("client logging with json " + JSON.stringify(json));
		if (json.name == null) {json.name = "";}
		if (json.name.length >= 3 && json.name.length <= 10) {
			var nameExists = false;
			for (var playerKey in gmc.players) {
				if (gmc.players[playerKey].name == json.name) {
					nameExists = true;
					break;
				}
			}
			if (!nameExists) {
				var player = new gmc.Player(client);
				player.name = json.name;
				var i = 0; while (gmc.players[i] != null) {i++;}
				player.key = i;
				gmc.players[i] = player;
				
				var world = gmc.worlds['start'];
			
				var hero = new gmc.Unit(world, 0, 0, "hero");
				hero.x = gmc.g2.rndReal(50, 400);
				hero.y = gmc.g2.rndReal(50, 400);
				hero.name = player.name;
				hero.player = player;
				player.unit = hero;
				
				//gmc.report("unit logged. world.key="+hero.world.key);
				
				gmc.forEachWorldPlayer(world, function(player) {
					player.client.emit("game", {t: gmc.now, unit: hero.packet()});
				});
				
				player.client.on("disconnect", function() {
					gmc.report("disconnecting player with key " + player.key);
					if (player.unit != null) {
						gmc.removeUnit(player.unit);
					}
					player.destroy();
					delete gmc.players[player.key];
				});
				
				client.emit("login response", {ok: true, msg: "Logged In.", worldKey: hero.world.key});
				
			} else {
				client.emit("login response", {ok: false, msg: "Name already exists."});
				client.disconnect();
			}
		} else {
			client.emit("login response", {ok: false, msg: "Name must be between 3 and 10 characters long"});
			client.disconnect();
		}
	});
});

// CREATE GMC HERE ---------- //
var w = gmc.createWorld("start");
gmc.createWorld("forest");
var portal = new gmc.Portal(gmc.worlds['start'], 100, 100, gmc.worlds['forest'], 0, 0);
var portal = new gmc.Portal(gmc.worlds['forest'], 300, 400, gmc.worlds['start'], 300, 300);
// -------------------------- //

server.runtime = function(dt) {
	//console.log(dt);
	gmc.runtime(dt);
};







