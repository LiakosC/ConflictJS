

var ModelEffect = function() {
    this.playing = false;
    this.start = function() {
        if (this.onStart !== null) {this.onStart();}
        this.playing = true;
    };
    this.end = function() {
        if (this.onEnd !== null) {this.onEnd();}
        this.playing = false;
    };
    this.onStart = null;
    this.onEnd = null;
};
var Model = function(parentSprite) {
    this.parentSprite = parentSprite;
    this.sprites = {};
    this.animations = {};
    this.timers = {};
    this.tweens = {};
    this.effects = {}
    this.playEffect = function(effectKey) {
        if (this.effects[effectKey] != null) {
            for (var k in this.effects) {
                if (this.effects[k] != this.effects[effectKey]) {
                    if (this.effects[k].playing) {
                        this.effects[k].end();
                    }
                }
            }
            this.effects[effectKey].start();
        }
    };
    this.destroy = function() {
        for (var spriteKey in this.sprites) {
            this.sprites[spriteKey].destroy();
        }
    };
};















/*
var Unit = function(x, y) {
    var THIS = this;
    
    this.pointSprite = game.add.sprite(x, y, null);
    this.pointSprite.anchor.setTo(0.5, 0.5);
    
    this.model = new Model(this.pointSprite);
    this.model.sprites.texture = game.add.sprite(0, 0, "units_hero_texture");
    this.model.sprites.texture.anchor.setTo(0.5, 0.5);
    this.model.parentSprite.addChild(this.model.sprites.texture);
    
    
    this.model.sprites.texture.loadTexture("units_hero_move", 0);
    //this.model.animations.move = this.model.sprites.texture.animations.add(0, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
    this.model.animations.move = this.model.sprites.texture.animations.add("move", null, 30, true);
    this.model.sprites.texture.loadTexture("units_hero_attack1");
    this.model.animations.attack1 = this.model.sprites.texture.animations.add("attack1", null, 30, false);
    this.model.sprites.texture.loadTexture("units_hero_attack2");
    this.model.animations.attack2 = this.model.sprites.texture.animations.add("attack2", null, 30, false);
    this.model.sprites.texture.loadTexture("effects_explosion0_idle")
    this.model.animations.explosion = this.model.sprites.texture.animations.add("explosion", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 20, false);
    
    
    this.model.effects.move = new ModelEffect();
    this.model.effects.move.onStart = function() {
        THIS.model.effects.attack1.end();
        THIS.model.effects.attack2.end();
        THIS.model.sprites.texture.loadTexture("units_hero_move", 0);
        //THIS.model.sprites.texture.reset();
        THIS.model.sprites.texture.alpha = 1;
        THIS.model.animations.move.play();
    };
    this.model.effects.move.onEnd = function() {
        //THIS.model.animations.move.stop();
    };
    
    this.model.effects.attack1 = new ModelEffect();
    this.model.effects.attack1.onStart = function() {
        THIS.model.sprites.texture.loadTexture("units_hero_attack1", 0);
        THIS.model.animations.attack1.play();
        THIS.model.sprites.texture.x = -0;
        THIS.model.sprites.texture.y = +5;
    };
    this.model.effects.attack1.onEnd = function() {
        THIS.model.sprites.texture.x = 0;
        THIS.model.sprites.texture.y = 0;
    };
    this.model.effects.attack2 = new ModelEffect();
    this.model.effects.attack2.onStart = function() {
        THIS.model.sprites.texture.loadTexture("units_hero_attack2", 0);
        THIS.model.animations.attack2.play();
        THIS.model.sprites.texture.x = +20;
        THIS.model.sprites.texture.y = -5;
    };
    this.model.effects.attack2.End = function() {
        THIS.model.sprites.texture.x = 0;
        THIS.model.sprites.texture.y = 0;
    };
    this.model.effects.explode = new ModelEffect();
    this.model.effects.explode.onStart = function() {
        THIS.model.sprites.texture.loadTexture("units_hero_texture");
        THIS.model.tweens.explosionFade = game.add.tween(THIS.model.sprites.texture).to({alpha:0.4}, 1000);
        THIS.model.tweens.explosionFade.start();
        THIS.model.tweens.explosionFade.onComplete.addOnce(function() {
            if (THIS.model.effects.explode.playing) {
                THIS.model.sprites.texture.loadTexture("effects_explosion0_idle");
                THIS.model.sprites.texture.alpha = 1;
                THIS.model.animations.explosion.play(null, false, true);
                THIS.model.animations.explosion.onComplete.addOnce(function() {
                    game.time.events.add(0, function() {
                        THIS.model.effects.explode.end();
                    });
                })
            }
        })
    };
    THIS.model.effects.explode.onEnd = function() {
        if (THIS.model.tweens.explosionFade != null) {
            game.tweens.remove(THIS.model.tweens.explosionFade);
        }
        THIS.model.sprites.texture.reset();
        THIS.model.sprites.texture.alpha = 1;
    }
};

var panel = document.createElement("div");
panel.setAttribute("style", "position:absolute; left0%; top:0%; width:0px; top:0px;")

var units = {};

function create() {
    game.canvas.parentNode.appendChild(panel);
    panel.innerHTML = '<button>Move</button><button>Attack1</button><button>Attack2</button><button>Explode</button>';
    panel.querySelectorAll("button")[0].onclick = function() {
        //units.hero.model.effects.move.start();
        units.hero.model.playEffect("move");
    };
    panel.querySelectorAll("button")[1].onclick = function() {
       // units.hero.model.effects.attack1.start();
        units.hero.model.playEffect("attack1");
    };
    panel.querySelectorAll("button")[2].onclick = function() {
        //units.hero.model.effects.attack2.start();
        units.hero.model.playEffect("attack2");
    };
    panel.querySelectorAll("button")[3].onclick = function() {
        //units.hero.model.effects.explode.start();
        units.hero.model.playEffect("explode");
    };
    
    
    units.hero = new Unit(100, 100);
    units.hero.pointSprite.rotation = Math.PI/2;
    //units.hero.model.effects.move.start();
    //game.time.events.add(1000, function() {units.hero.model.effects.move.end();});
}



*/





