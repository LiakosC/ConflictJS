
//console.log("Requiring Unit.js");

Unit = function(world, x, y, unitTypeCode) {
	gmc.Thing.call(this, world, x, y);
	
	var THIS = this;
	var i = 0; while (world.units[i] != null) {i++;}
	world.units[i] = this;
	this.key = i;
	
	this.unitTypeCode = unitTypeCode;
	this.unitType = gmc.unitTypes[unitTypeCode];
	if (this.unitType == undefined) {gmc.fatal("unitType " + unitTypeCode + " doesn't exist");}
	
	this.player	= null;
	this.name	= "UnitName";
	this.g2Circle = function() {
		return gmc.g2.Circle(this.g2Point(), this.r);
	};
	this.packet = function() {
		return {
			key: this.key,
			code: this.unitTypeCode,
			name: this.name,
			x: this.x,
			y: this.y,
			r: this.r,
			angle: this.angle
		}
	};
	
	this.movingSpeed = 100;
	this.movingXY = false;
	this.movingX = 0;
	this.movingY = 0;
	this.order_moveToXY = function(x, y) {
		if (this.canMove()) {
			this.moveToXY(x, y);
		}
	};
	this.canMove = function() {
		return true;
	};
	this.moveToXY = function(x, y) {
		this.movingXY = true;
		this.movingX = x;
		this.movingY = y;
	};
	this.stopMoving = function() {
		this.movingXY = false;
	};
	this.deltaMove = function(delta) {
		if (this.movingXY) {
			var ds = (delta / 1000) * this.movingSpeed;
			var destVector = gmc.g2.Vector_PP(gmc.g2.P(this.x, this.y), gmc.g2.P(this.movingX, this.movingY));
			var dVector = gmc.g2.Vector_AS(destVector.angle, ds);
			if (destVector.size < dVector.size) {
				dVector = destVector;
				this.stopMoving();
			}
			this.x += dVector.dx();
			this.y += dVector.dy();
			this.angle = dVector.angle;
			gmc.forEachWorldPlayer(this.world, function(player) {
				player.client.emit("game", {t: gmc.now, unit_mv_ease: {key: THIS.key, x: THIS.x, y: THIS.y} });
				player.client.emit("game", {t: gmc.now, unit_angle: {key: THIS.key, angle: THIS.angle} });
				if (!THIS.movingXY) {
					player.client.emit("game", {t: gmc.now, unit_mv_stop: {key: THIS.key, x: THIS.x, y: THIS.y} });
				}
			});
		}
	};
	
	
	this.spells = {};
	
	this.deltaUpdate = function(delta) {
		this.deltaMove(delta);
		for (var portalKey in this.world.portals) {
			var portal = this.world.portals[portalKey];
			if (gmc.g2.circleOverCircle(this.g2Circle(), portal.g2Circle())) {
				//console.log("OVERLAP");	
				gmc.teleportUnit(this, portal.worldTo, portal.xTo, portal.yTo);
			}
		}
	};
	


	
	this.destroy = function() {
		
	};
	
}
Unit.prototype = Object.create(gmc.Thing.prototype);
Unit.prototype.constructor = Unit;

module.exports = Unit;




