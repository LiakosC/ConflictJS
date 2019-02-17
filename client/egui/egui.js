var egui = {
	EGUIObject: function(container) {
		this.container = container;
		this.displayed = true;
		this.onOpen = null;
		this.onClose = null;
		this.onDestroy = null;
		this.toggle = function(flag) {
			if (flag != null) {
				if (flag) {
					this.container.classList.remove("egui-off");
					this.displayed = true;
					if (this.onOpen != null) {this.onOpen();}
				} else {
					this.container.classList.add("egui-off");
					this.displayed = false;
					if (this.onClose != null) {this.onClose();}
				}
			} else {this.toggle(!this.displayed);}
		};
		this.destroy = function() {
			if (this.onDestroy != null) {this.onDestroy();}
			this.container.innerHTML = "";
		};
	}
};

egui.ROOT = "egui";