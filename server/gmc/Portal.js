var Portal = function(world, x, y, worldTo, xTo, yTo) {
	gmc.Thing.call(this, world, x, y);
	var i = 0; while (world.portals[i] != undefined) {i++;}
	world.portals[i] = this;
	this.key = i;
	this.r = 10;
	this.g2Circle = function() {
		return gmc.g2.Circle(this.g2Point(), this.r);
	};
	this.packet = function() {
		return {
			key: this.key,
			x: this.x,
			y: this.y
		}
	};
	
	this.worldTo = worldTo;
	this.xTo = xTo;
	this.yTo = yTo;
	
	//gmc.report("portal.world.key="+this.world.key);
	//gmc.report("portal.worldTo.key="+this.worldTo.key);
};
Portal.prototype = Object.create(gmc.Thing.prototype);
Portal.prototype.constructor = Portal;

module.exports = Portal;