



egui.EpicLoading = function(container) {
	egui.EGUIObject.call(this, container);
	
	this.container.innerHTML = '\
		<div class="EpicLoading-comment"></div>\
		<div class="EpicLoading-bar">\
			<div style="width:0%;"></div>\
		</div>\
	';
	
	this.bar = this.container.querySelectorAll(".EpicLoading-bar > div")[0];
	this.commentDiv = this.container.querySelectorAll(".EpicLoading-comment")[0];
	
	this.progress = 0;
	this.set = function(coef /*0-1*/) {
		if (coef < 0) {coef = 0;} else if (coef > 1) {coef = 1;}
		this.progress = coef;
		this.bar.style.width = (coef * 100) + "%";
		if (coef == 1) {
			if (this.callback != null) {this.callback();}	
		}
	};
	this.add = function(coef) {
		this.set(this.progress + coef);
	};
	
	this.setComment = function(text) {
		this.commentDiv.innerHTML = text;
	};
	
	
	
	this.callback = null;
};
egui.EpicLoading.prototype = Object.create(egui.EGUIObject.prototype);
egui.EpicLoading.prototype.constructor = egui.EpicLoading;