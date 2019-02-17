egui.WarChat = function(container) {
	egui.EGUIObject.call(this, container);
	
	//this.container = container;
	
	this.container.innerHTML = '\
	<div class="WarChat-text">\
		<div>\
			<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>5</div><div>5</div><div>5</div><div>5</div>\
		</div>\
	</div>\
	<div class="WarChat-input">\
		<input/>\
	</div>\
	';
	
	
};
egui.WarChat.prototype = Object.create(egui.EGUIObject.prototype);
egui.WarChat.prototype.constructor = egui.WarChat;