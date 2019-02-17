/*
var win = new FlexibleWindow(width, height);
all elements inside win.element should have % size / coords if you want them to be scaled up
put phaser canvas inside win.element or another child, and it will be automatically scaled/modified by phaser engine

win.fullscreen(); //toggle
win.fullscreen(true); // on
win.fullscreen(false); // off

win.mouseX, win.mouseY | read only, independent of scale

win.xtocX() // px to % on x axis
win.xtocY() // px to % on y axis
win.ctoxY() // % to px on x axis
win.ctoxY() // % to px on y axis
*/
var FlexibleWindow = function(divElement, width, height) {
	
	var FULLSCREEN_INTERVAL = 80;
	
	var THIS = this;
	
	this.width = width;
	this.height = height;
	this.ratio = width / height;
	this.windowedScale = 1;
	
	if (typeof require != 'undefined') {
		this.nwgui = require("nw.gui");
	} else {
		this.nwgui = null;
	}
	
	if (divElement != null) {
		this.element = divElement;
	} else {
		this.element = document.createElement("div");
		document.body.appendChild(this.element);
	}
	this.element.style.position = "absolute";
	this.element.style.overflow = "hidden";
	this.element.style.left = "0px";
	this.element.style.top = "0px";
	this.element.style.right = "0px";
	this.element.style.bottom = "0px";
	this.element.style.margin = "auto";
	this.element.style.width = width + "px";
	this.element.style.height = height + "px";
	
	this.scale = 1; // read only
	this.setScale = function(scale) {
		//console.log("setting scale", scale);
		this.element.style.width =  this.width * scale + "px";
		this.element.style.height = this.height * scale + "px";
		this.element.style.fontSize = scale * 100 + "%";
		this.scale = scale;
	}
	
	
	
	this.mouseX = 0;
	this.mouseY = 0;
	document.body.addEventListener("mousemove", function(e) {
		THIS.mouseX = (e.clientX - THIS.element.offsetLeft) / THIS.scale;
		THIS.mouseY = (e.clientY - THIS.element.offsetTop) / THIS.scale;
	});
	
	
	var error_fixed = false;
	var error_dx;
	var error_dy;
	this.resize_nw_window = function(width, height) {
		if (this.nwgui != null) {
			this.nwgui.Window.get().width = width;
			this.nwgui.Window.get().height = height;
			if (!error_fixed) {
				error_dx = window.innerWidth - this.nwgui.Window.get().width;
				error_dy = window.innerHeight - this.nwgui.Window.get().height;
				error_fixed = true;
			}
			this.nwgui.Window.get().width = width - parseInt(error_dx);
			this.nwgui.Window.get().height = height - parseInt(error_dy);
		}
	}
	
	this.getMinScale = function() {
		//var windowRatio = window.innerWidth / window.innerHeight;
		var windowRatio = screen.width / screen.height;
		if (windowRatio > this.ratio) { // screen too much width
			return screen.height / this.height;
		} else { // screen too much height
			return screen.width / this.width;
		}
	}
	
	this.fullscreenTarget = document.body;
	if (document.body.webkitRequestFullScreen != null) {
		this.requestFullScreen = function() {this.fullscreenTarget.webkitRequestFullScreen();}
		this.cancelFullScreen = function() {document.webkitCancelFullScreen();}
	} else if (document.body.mozRequestFullScreen != null) {
		this.requestFullScreen = function() {this.fullscreenTarget.mozRequestFullScreen();}
		this.cancelFullScreen = function() {document.mozCancelFullScreen();}
	} else {
		this.requestFullScreen = this.fullscreenTarget.requestFullScreen;
		this.cancelFullScreen = this.fullscreenTarget.cancelFullScreen;
	}
	this.fullscreenScale = 1;
	this.isFullscreen = false;
	this.fullscreen = function(toggle) {
		if (toggle != undefined) {
			if (toggle) {
				this.requestFullScreen();
				this.isFullscreen = true;
			} else {
				this.cancelFullScreen();
				this.isFullscreen = false;
			}
			setTimeout(function() {
				if (THIS.isFullscreen) {
					THIS.setScale(THIS.getMinScale());
				} else {
					THIS.setScale(THIS.windowedScale);
					THIS.resize_nw_window(THIS.width, THIS.height);
				}
			}, FULLSCREEN_INTERVAL);
		} else { // toggle not set
			this.fullscreen(!this.isFullscreen);
		}
	}
	
	this.resize_nw_window(this.width, this.height);
	var THIS = this;
	setTimeout(function() {
		THIS.setScale(1);
	}, FULLSCREEN_INTERVAL);
	
	this.xtocX = function(px) {return px * 100 / THIS.width;};
	this.xtocY = function(px) {return px * 100 / THIS.height;};
	this.ctoxX = function(percent) {return parseInt(percent / 100 * THIS.width);};
	this.ctoxY = function(percent) {return parseInt(percent / 100 * THIS.height);};
}	