var WarMinimap = function(container) {
	this.box = container;
	this.box.innerHTML = '\
	\
	';
	this.destroy = function() {
		this.box.innerHTML = "";
	};
};