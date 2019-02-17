//gmc.debug("Requiring Player.js");

var Player = function(client) {
	var THIS = this;
	this.key = null;
	this.client = client;
	this.name = "PlayerName";
	this.unit = null;
	
	this.dump = function() {
		var unit = (this.unit != null) ? "UNIT" : "NULL";
		return JSON.stringify({name: this.name, unit: unit});	
	}
	
	this.destroy = function() {
		console.log("destroying player with key "+this.key);	
	}
	
	this.mePacket = function() {
		if (this.unit != null) {
			return {
				name: this.name,
				unit: this.unit.packet()
			};
		} else {gmc.fatal("mePacket error - null unit");}
	};
	
	this.client.on("request_world", function() {
		if (THIS.unit == null) {gmc.fatal("null unit requesting world");}
		THIS.client.emit("game", {world: THIS.unit.world.packet()});
	});
	
	this.client.on("request_all", function() {
		if (THIS.unit == null) {gmc.fatal("null unit in player");}
		THIS.client.emit("game", {world: THIS.unit.world.packet()});
		THIS.client.emit("game", {me: THIS.mePacket()});
		for (var unitKey in THIS.unit.world.units) {
			THIS.client.emit("game", {unit: THIS.unit.world.units[unitKey].packet()});
		}
		for (var portalKey in THIS.unit.world.portals) {
			THIS.client.emit("game", {portal: THIS.unit.world.portals[portalKey].packet()});
		}
	});
	
	this.client.on("cast_moveToXY", function(json) {
		if (THIS.unit != null) {
			var x = Number(json.x);
			var y = Number(json.y);
			THIS.unit.order_moveToXY(x, y);
		}
	});
};
	
	/*
var Player = function(client, pRow) {
	var THIS = this;
	var i = 0; while (gmc.players[i] != undefined) {i++;}
	gmc.players[i]	= this;
	this.key				= i;
	this.accountID		= pRow.accountID;
	this.playerID		= pRow.playerID;
	this.name			= pRow.name;
	this.worldCode		= pRow.worldCode;
	this.heroCode 		= "hero";
	this.ip				= null;
	this.client			= client;
	// ----------------------------------------------------------- //
	this.unit 		= null;
	this.x			= pRow.x;
	this.y			= pRow.y;
	this.angle		= pRow.angle;
	this.baseX		= pRow.baseX;
	this.baseY		= pRow.baseY;
	this.create_unit = function(code, world, x, y, angle) {
		this.unit = new Unit(code, world, x, y, angle);
		this.unit.name = this.name;
		this.unit.setPlayer(this);
		this.unit.world = world;
		//$game['send_players']("/UNIT ".$this->unit->key." ".json_encode($this->unit->clientData()), $world->getPlayersExc($this));
		return this.unit;
	}
	this.save = function(callback) {
		var worldCode, x, y, angle;
		if (this.unit == null) {
			worldCode = this.worldCode; x = this.x; y = this.y; angle = 0;
		} else {
			worldCode = this.unit.world.code; x = this.unit.x; y = this.unit.y; angle = this.unit.angle;
		}
		server.link.query("update players set\
		worldCode='"+worldCode+"', x="+x+", y="+y+", angle="+angle+"\
		where id="+this.playerID, function(err, rows) {
			if (err) {console.log(err);} else {if (callback !== undefined) {callback();}}
		});
	}
	this.remove = function(callback) {
		this.save(function() { // .save IS ASYNCHRONOUS - NEEDS CALLBACK
			if (THIS.unit != null) {THIS.unit.remove();}
			gmc.send_players("server", {msg: THIS.name+" has logged out"}, gmc.players);
			delete gmc.players[THIS.key];
			if (callback !== undefined) {callback();}
		});
	}
}
	*/
module.exports = Player;