
game.Unit = function(unitTypeCode) { // inherits Thing
	game.Thing.call(this);
	
	//report("constructing Unit with code " + unitTypeCode);
	var ph = game.ph;
	var THIS = this;
	
	this.key = null;
	this.unitTypeCode = unitTypeCode;
	this.unitType = game.unitTypes[unitTypeCode];
	this.name = this.unitType.name || "UnitName";
	
	game.unitsGroup.add(this.pointSprite);
	
	this.unitType.model(this.model);
	
	this.onLeftClick = function() {
		game.leftClickUnit(this);
	};
	this.onRightClick = function() {
		game.rightClickUnit(this);
	};
	this.onMouseOver = function() {
		THIS.nameLabel.visible = true;
		//game.unitMouseOver(this);
	};
	this.onMouseOut = function() {
		THIS.nameLabel.visible = false;
		//game.unitMouseOut(this);
	};
	
	this.nameLabel = ph.add.text(0, -43, this.name, {fontSize: "14px", fill: "#FFFFFF"});
	this.nameLabel.anchor.setTo(0.5);
	this.nameLabel.visible = false;
	this.nameLabel.setShadow(1, 1, "rgba(0, 0, 0, 1)", 0);
	
	this.pointSprite.addChild(this.nameLabel);
	
	this.setName = function(name) {this.name = name; this.nameLabel.setText(name);}
	
	
	this.hp		= 100;
	this.hpMax	= 150;
	var hpBarWidth = 70;
	var hpBarHeight = 8;
	this.hpBarOut = ph.add.graphics();
	this.hpBarIn = ph.add.graphics();
	this.hpBarOut.anchor.setTo(0.5, 0.5);
	this.hpBarIn.anchor.setTo(0.5, 0.5);
	this.hpBarOut.x = - hpBarWidth / 2;
	this.hpBarOut.y = -38;
	this.hpBarOut.lineStyle(1, 0x890002, 1);
	this.hpBarOut.beginFill(0x000000, 1);
	this.hpBarOut.drawRect(0, 0, hpBarWidth, hpBarHeight);
	this.hpBarOut.addChild(THIS.hpBarIn);
	this.pointSprite.addChild(THIS.hpBarOut);
	this.updateHpBar = function() {
		this.hpBarIn.clear();
		this.hpBarIn.beginFill(0xFF0004, 0.5);
		this.hpBarIn.drawRect(1, 1, (hpBarWidth * (this.hp / this.hpMax) - 1), hpBarHeight - 1);
	};
	this.setHp = function(hp, hpMax) {
		this.hp = hp;
		this.hpMax = hpMax;
		this.updateHpBar();
	};
	this.updateHpBar();
	
	this.selectCircle = ph.add.graphics();
	this.pointSprite.addChild(THIS.selectCircle);
	this.select = function() {
		this.selectCircle.lineStyle(1, 0x42aaff, 1);
		this.selectCircle.drawCircle(0, 0, 100);
	};
	this.diselect = function() {
		this.selectCircle.clear();
	};
	

	/*
	// --------------------------------------------------- //
	this.setSpeed = function(speed) {
		this.speed = speed;
		if (this.isMoving) {
			this.sprite.body.velocity.x = this.speed * Math.cos(this.sprite.rotation);
			this.sprite.body.velocity.y = this.speed * Math.sin(this.sprite.rotation);
		}
	}
	this.isMoving			= false;
	this.isMovingPoint 	= false;
	this.isMovingAngle 	= false;
	this.movingAngle 		= 0;
	
	this.isAttacking		= false;
	this.attackingUnit	= null;

	this.stopSprite = ph.add.sprite(-111, -111, null);
	ph.physics.arcade.enable(this.stopSprite);
	this.stopSprite.body.setSize(0, 0);
	this.moveToPoint = function(x, y) {
		this.sprite.rotation = ph.math.angleBetweenPoints({x: this.sprite.x, y: this.sprite.y}, {x: x, y: y});
		this.sprite.body.velocity.x = this.speed * Math.cos(this.sprite.rotation);
		this.sprite.body.velocity.y = this.speed * Math.sin(this.sprite.rotation);
		this.stopSprite.x = x + (this.r) * Math.cos(this.sprite.rotation);
		this.stopSprite.y = y + (this.r) * Math.sin(this.sprite.rotation);
		this.isMovingPoint = true;
		this.isMovingAngle = false;
		this.isMoving = true;
		this.stopAttack();
	}
	this.moveToAngle = function(angle) {
		this.sprite.rotation = angle;
		this.sprite.body.velocity.x = this.speed * Math.cos(this.sprite.rotation);
		this.sprite.body.velocity.y = this.speed * Math.sin(this.sprite.rotation);
		this.stopSprite.x = -111; this.stopSprite.y = -111;
		this.isMovingPoint = false;
		this.isMovingAngle = true;
		this.isMoving = true;
		this.stopAttack();
	}
	this.stopMoving = function() {
		this.sprite.body.velocity.x = 0; this.sprite.body.velocity.y = 0;
		this.stopSprite.x = -111; this.stopSprite.y = -111;
		this.isMoving = false;
		this.isMovingPoint = false;
		this.isMovingAngle = false;
	}
	*/
	
	this.scaleTween = null;
	this.walkingMoveTween = null;
	this.moveWalkingToXY = function(x, y, duration) {
		if (duration == null) {duration = 0;}
		if (duration == 0) {duration = 1000;}
		this.walkingMoveTween = game.ph.add.tween(THIS.pointSprite).to({x: x, y: y}, 10, null, true);
		//THIS.pointSprite.x = x;
		//THIS.pointSprite.y = y;
		this.model.effects.move.start();
		//report("move walking to " + x + ", " + y);
	};
	this.stopMoving = function(x, y) {
		if (x != null) {THIS.pointSprite.x = x;}
		if (y != null) {THIS.pointSprite.y = y;}
		this.model.effects.move.end();
		this.model.effects.idle.start();
	}
	
	
	/*
	this.stop = function() {
		this.stopMoving();
		this.stopAttack();
		if (this == game.me.unit) {game.me.stoping();}
	}
	this.attack = function(target) {
		this.stopMoving();
		this.isAttacking = true;
		this.attackingUnit = target;
	}
	this.stopAttack = function() {
		this.isAttacking = false;
		this.attackingUnit = null;
	}
	this.dies = function() {
		this.stop();
		this.anims.deathTween = ph.add.tween(this.sprite).to({alpha: 0.3}, 1000, Phaser.Easing.Linear.None, true);
		if (game.me.exist()) {if (this == game.me.unit) {game.me.dying();}}
	}
	this.revive = function(x, y) {
		this.toXYA(x, y);
		this.sprite.alpha = 1;
		if (game.me.exist()) {if (this == game.me.unit) {game.me.reviving();}}
	}
	// --------------------------------------------------- //	
	*/
	// --------------------------------------------------- //	
	// --------------------------------------------------- //
	
	// --------------------------------------------------- //
	/*
	this.anims = {
		special: null,
		playing: false,
		play: function(anim) {
			THIS.anims.playing = true;
			THIS.anims.playingMove = false;
			console.log("ANIM: "+anim);
			THIS.sprite.loadTexture("units/" + this.unitTypeCode + "/" + anim + ".png", 0);
			THIS.anims.special = THIS.sprite.animations.add(0);
			THIS.sprite.animations.play(0, 25, false);
			THIS.anims.special.onComplete.add(function() {THIS.anims.playing = false;});
		},
		playingMove: false,
		playMove: function() {
			if (THIS.anims.playingMove == false && THIS.anims.playing == false) {
				THIS.anims.playingMove = true;
				THIS.anims.playingStand = false;
				try {
					THIS.sprite.loadTexture("units/" + this.unitTypeCode + "/move.png", 0);
					THIS.sprite.animations.add(0);
					THIS.sprite.animations.play(0, 20, true);
				} catch(e) {}
			}
		},
		playingStand: false,
		playStand: function() {
			if (THIS.anims.playingStand == false && THIS.anims.playing == false) {
				THIS.anims.playingMove = false;
				THIS.anims.playingStand = true;
				THIS.sprite.loadTexture("units/" + this.unitTypeCode + "/texture.png", 0);
				//THIS.sprite.animations.add(0);
				//THIS.sprite.animations.play(0, 20, true);
			}
		},
		deathTween: null
	};
	// --------------------------------------------------- //
	this.phaserUpdate = function() {
		this.nameLabel.position.x = this.sprite.x;
		this.nameLabel.position.y = this.sprite.y - 51;
		this.select.phaserUpdate();
		this.hpBar.phaserUpdate();
		// --------------------------------------------------- //
		if (this.isMoving) {
			THIS.anims.playMove();
		} else if (this.isAttacking && typeof this.attackingUnit !== 'undefined' && this.attackingUnit != null) {
			var target = this.attackingUnit;
			this.sprite.rotation = ph.math.angleBetweenPoints({x: THIS.sprite.x, y: THIS.sprite.y}, {x: target.sprite.x, y: target.sprite.y});
			this.sprite.body.velocity.x = this.speed * Math.cos(this.sprite.rotation);
			this.sprite.body.velocity.y = this.speed * Math.sin(this.sprite.rotation);
			var d = ph.math.distance(this.sprite.x, this.sprite.y, target.sprite.x, target.sprite.y);
			if (d > (this.r + target.r)) {
				this.sprite.body.velocity.x = this.speed * Math.cos(this.sprite.rotation);
				this.sprite.body.velocity.y = this.speed * Math.sin(this.sprite.rotation);
				this.anims.playMove();
			} else {
				this.sprite.body.velocity.x = 0;
				this.sprite.body.velocity.y = 0;
				this.anims.playStand();
			}
		} else {
			this.anims.playStand();
		}
		// --------------------------------------------------- //
		ph.physics.arcade.overlap(THIS.sprite, THIS.stopSprite, function() {
			THIS.stop();
		}, null, this);
		ph.physics.arcade.collide(THIS.sprite, game.buildingsGroup, function() {
			THIS.stop();
		}, null, this);
		// --------------------------------------------------- //
	}
	*/
	/*
		setHp
		setSpeed
		setName
	
	game.units[key] = this;
	*/
}
game.Unit.prototype = Object.create(game.Thing.prototype);
game.Unit.prototype.constructor = game.Unit;


game.Unit.getUnitPath = function(code) {
	return GRAPHICS_ROOT + "/units/" + code;
};



