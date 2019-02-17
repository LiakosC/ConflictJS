game.Thing = function() {
	var ph = game.ph;
	var THIS = this;
	this.pointSprite = ph.add.sprite(0, 0, null);
	this.pointSprite.anchor.setTo(0.5, 0.5);
	this.model = new Model(this.pointSprite);
	this.model.sprites.texture = ph.add.sprite(0, 0, null);
	this.model.sprites.texture.anchor.setTo(0.5, 0.5);
	this.pointSprite.addChild(this.model.sprites.texture);
	
	this.model.sprites.texture.inputEnabled = true;
	this.model.sprites.texture.events.onInputOver.add(function() {THIS.mouseOver = true; THIS.onMouseOver();}); //function() {});
	this.model.sprites.texture.events.onInputOut.add(function() {THIS.mouseOver = false; THIS.onMouseOut();}); //function() {});
	this.model.sprites.texture.events.onInputDown.add(function(textureSprite, pointer) {
		if (pointer.leftButton.isDown) {
			THIS.onLeftClick();
		} else if (pointer.rightButton.isDown) {
			THIS.onRightClick();
		}
	});
	
	this.mouseOver = false;
	this.onLeftClick = function() {}
	this.onRightClick = function() {}
	this.onMouseOver = function() {}
	this.onMouseOut = function() {}
	
	this.setXY = function(x, y, angle) {
		this.pointSprite.x = x;
		this.pointSprite.y = y;
		if (angle != null) {this.setAngle(angle);}
	};
	this.setAngle = function(angle) {
		this.model.sprites.texture.rotation = angle;
	};
	
	this.destroy = function() {
		//this.stopSprite.destroy(); delete this.stopSprite;
		//this.hpBar.graphic.destroy(); delete this.hpBar.graphic;
		//this.hpBar.innerGraphic.destroy(); delete this.hpBar.innerGraphic;
		//delete this.hpBar;
		//this.nameLabel.destroy(); delete this.nameLabel;
		//this.select.graphic.destroy(); delete this.select.graphic;
		this.pointSprite.destroy();
	}
};