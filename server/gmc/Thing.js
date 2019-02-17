var Thing = function(world, x, y) {
	var THIS = this;
	this.key = -1;
	this.world = world;
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.r = 1;
	this.setXY = function(x, y, angle) {
		this.x = x;
		this.y = y;
		if (angle != null) {this.angle = angle;}
	}
	this.g2Point = function() {
		return gmc.g2.P(this.x, this.y);
	}
};

module.exports = Thing;