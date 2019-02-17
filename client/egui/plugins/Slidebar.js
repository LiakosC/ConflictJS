/*
var slidebar = new egui.Slidebar(element);
slidebar.set(50); // percent
slidebar.onChange = function(perc) {

}
*/

egui.Slidebar = function(container) {
	egui.EGUIObject.call(this, container);
	var THIS = this;
	
	this.container.classList.remove("egui-Slidebar");
	this.container.classList.add("egui-Slidebar");
	
	this.container.innerHTML = '\
		 &#8203;<div class="egui-Slidebar-slider"></div>\
	'; // blank character used so divs with relative position (slidebars) can show up
	this.slider = this.container.querySelector("div");
	
	this.perc = 100;
	this.set = function(perc/*0-100*/) {
		if (perc < 0) perc = 0; else if (perc > 100) perc = 100;
		this.perc = perc;
		var left = perc/100 * this.container.offsetWidth - this.slider.offsetWidth/2;
		var left_percent = (left/this.container.offsetWidth*100).toFixed(1);
		this.slider.style.left = left_percent+"%";
		this.onChange(perc);
	}
	this.container.addEventListener("mousedown", function(e) {
		var rect = THIS.container.getBoundingClientRect();
		var left = e.clientX - rect.left;
		var left_percent = left/THIS.container.offsetWidth*100;
		THIS.set(left_percent);
		window.addEventListener("mousemove", THIS.mousemoveCallback);
		window.addEventListener("mouseup", function(e) {
			window.removeEventListener("mousemove", THIS.mousemoveCallback);
		});
	});
	this.mousemoveCallback = function(e) {
		var rect = THIS.container.getBoundingClientRect();
		var left = e.clientX - rect.left;
		var left_percent = left/THIS.container.offsetWidth*100;
		THIS.set(left_percent);
	};
	this.onChange = function(perc) {}
};
egui.Slidebar.prototype = Object.create(egui.EGUIObject.prototype);
egui.Slidebar.prototype.constructor = egui.Slidebar;

/* SPECIFIC */



	