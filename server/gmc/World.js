
//console.log("Requiring World.js");

var World = function() {
	this.key = null;
	this.name = "WorldName";
	this.units = {};
	this.portals = {};
	
	this.packet = function() {
		return {
			key: this.key,
			name: this.name
		};
	};
	
	this.deltaUpdate = function(delta) {
		for (var unitKey in this.units) {
			this.units[unitKey].deltaUpdate(delta);	
		}
	};
	/*
	this.getUnitsInCircle = function(x, y, r) {
		var units = [], distance;
		for (var key in this.units) {
			distance = geo.getPointsDistance(geo.P(this.x, this.y), geo.P(x, y));
			if (distance <= r) {units.push(this.units[key]);}
		} return units;
	}
	this.create_portal = function(name, x, y, target_world, target_x, target_y) {
		var portal = {name: name, world: this, x: x, y: y, target_world: target_world, target_x: target_x, target_y: target_y};
		this.portals.push(portal);
	}
	this.checkPortalsOverlap = function() {
		var units;
		for (var i=0; i<this.portals.length; i++) {
			units = this.getUnitsInCircle(this.portals[i].x, this.portals[i].y, 30);
			for (var j=0; j<units.length; j++) {
				units[j].teleport(this.portals[i].target_world, this.portals[i].target_x, this.portals[i].target_y);
			}
		}
	}
	this.timeUpdate = function(s) {
		for (var key in this.units) {
			this.units[key].timeUpdate(s);
		}
	}
	*/
}

module.exports = World;