var UnitWindow = function(parentElement) {
	
	this.parent = parentElement;
	this.parent.classList.add("UnitWindow");
	
	this.parent.innerHTML = '\
	<div class="UnitWindow-icon">\
		<img/>\
	</div>\
	<div class="UnitWindow-name">???</div>\
	<div class="UnitWindow-health">\
		<div></div>\
		<span>? / ?</span>\
	</div>\
	<div class="UnitWindow-energy">\
		<div></div>\
		<span>? / ?</span>\
	</div>\
	<div class="UnitWindow-level">1</div>\
	';
	
	this.icon = this.parent.querySelectorAll(".UnitWindow-icon img")[0];
	this.nameLabel = this.parent.querySelectorAll(".UnitWindow-name")[0];
	this.healthBar = this.parent.querySelectorAll(".UnitWindow-health div")[0];
	this.healthLabel = this.parent.querySelectorAll(".UnitWindow-health span")[0];
	this.energyBar = this.parent.querySelectorAll(".UnitWindow-energy div")[0];
	this.energyLabel = this.parent.querySelectorAll(".UnitWindow-energy span")[0];
	this.levelLabel = this.parent.querySelectorAll(".UnitWindow-level")[0];
	
	this.setName = function(value) {
		this.nameLabel.innerHTML = value;
	};
	this.setLevel = function(value) {
		this.levelLabel.innerHTML = value;
	};
	this.setHealth = function(value, valueMax) {
		this.healthBar.style.width = (value / valueMax * 100) + "%";
		this.healthLabel.innerHTML = value + " / " + valueMax;
	};
	this.setEnergy = function(value, valueMax) {
		this.energyBar.style.width = (value / valueMax * 100) + "%";
		this.energyLabel.innerHTML = value + " / " + valueMax;
	};
	
	this.on = true;
	this.toggle = function(flag) {
		if (flag != null) {
			if (flag) {
				this.parent.style.display = "block";
				this.on = true;
			} else {
				this.parent.style.display = "none";
				this.on = false;
			}
		} else {this.toggle(!this.on);}
	};
	
	this.destroy = function() {
		this.parent.innerHTML = "";
	};
};