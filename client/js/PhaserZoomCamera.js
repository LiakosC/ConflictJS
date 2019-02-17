/*
var megaCamera = new PhaserZoomCamera(ph.camera);
*/

var PhaserZoomCamera = function(phCamera) {
	
	var THIS = this;
	var phaser = phCamera.game;
	
	this.phCamera = phCamera;
	this.zoomSpeed = 1;
	this.zoomMax = 5;
	this.zoomMin = 0.3;
	this.wheelEnabled = true;
	
	/**/
	phaser.input.mouse.mouseWheelCallback = function(e) {
		if (THIS.wheelEnabled) {
			var delta = THIS.phCamera.game.input.mouse.wheelDelta;
			var scale = THIS.phCamera.game.world.scale.x;
			var factor = 0.1;
			scale += scale * factor * delta * THIS.zoomSpeed;
			if (scale < THIS.zoomMin) {scale = THIS.zoomMin;}
			if (scale > THIS.zoomMax) {scale = THIS.zoomMax;}
			
			THIS.phCamera.game.world.scale.setTo(scale);
			var dx = THIS.phCamera.game.input.x - (THIS.phCamera.x + THIS.phCamera.width / 2);
			var dy = THIS.phCamera.game.input.y - (THIS.phCamera.y + THIS.phCamera.height / 2);
			//console.log(THI.phCamera.x, THIS.phCamera.y);
			//THIS.phCamera.x += dx / 3;
			//THIS.phCamera.y += dy / 3;
			//THIS.phCamera.focusOnXY(THIS.phCamera.x + (THIS.phCamera.width / 2), THIS.phCamera.y + (THIS.phCamera.height / 2));
			//THIS.phCamera.x += 5;
			//console.log(dx, dy);
			
			//THIS.phCamera.focusOnXY(THIS.mouseWorldX(), THIS.mouseWorldY());
			//THIS.phCamera.focusOnXY(THIS.phCamera.game.input.worldX, THIS.phCamera.game.input.worldY);
			//console.log(THIS.mouseWorldX(), THIS.mouseWorldY());
		}
	}
	
	
	var bounds_yes = false;
	var bounds_top;
	var bounds_right;
	var bounds_bot;
	var bounds_left;
	var importBounds = function() {
		if (bounds_yes) {
			phaser.camera.bounds = new Phaser.Rectangle(-bounds_left, -bounds_top, bounds_left + phaser.world.width + bounds_right, bounds_top + phaser.world.height + bounds_bot);
		} else {
			phaser.camera.bounds = null;
		}
	}
	this.setBounds = function(top, right, bot, left) {
		if (arguments.length == 1) {
			if (top == null) {
				bounds_yes = false;
			} else {
				bounds_yes = true;
				bounds_top = top;
				bounds_right = top;
				bounds_bot = top;
				bounds_left = top;
			}
		} else if (arguments.length == 4) {
			bounds_top = top;
			bounds_right = right;
			bounds_bot = bot;
			bounds_left = left;
		}
		importBounds();
	}
	
	phaser.scale.onFullScreenChange.add(function() {
		setTimeout(importBounds, 200);
	});
	
	this.mouseWorldX = function() {return phaser.input.worldX / phaser.world.scale.x;}
	this.mouseWorldY = function() {return phaser.input.worldY / phaser.world.scale.y;}
}