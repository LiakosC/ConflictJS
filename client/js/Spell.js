var Spell = function(code, cdMax) { // THE FUCKING SPELL CLASS
	var THIS = this;
	this.code = code;
	game.me.spells.spells[code] = this;
	var box = $("#abilities")[0];
	box.style.paddingLeft = "5px";
	this.btn = document.createElement("button");
	this.btn.title = code;
	this.btn.setAttribute("style", "position:relative; width:41px; height:41px; margin-right:4px; top:2px;");
	this.btn.innerHTML = '<img src="include/images/spells/' + code + '.png" style="pointer-events:none; width:100%; height:100%;"/>';
	this.btn.onclick = function() {THIS.cast();};
	this.cd = 0;
	this.cdMax = cdMax || 2;
	this.cdBar = document.createElement("div");
	this.cdBar.setAttribute("style", "position:absolute; pointer-events:none; left:0px; top:0px; height:100%; width:50%; background:rgba(0, 0, 0, 0.8);");
	this.disableDiv = document.createElement("div");
	this.disableDiv.setAttribute("class", "full");
	this.disableDiv.setAttribute("style", "pointer-events:none; display:none; background:rgba(124, 124, 124, 0.7);");
	box.appendChild(this.btn);
	this.btn.appendChild(this.disableDiv);
	this.btn.appendChild(this.cdBar);
	
	this.enabled = true;
	this.enable = function() {this.enabled = true; this._update();}
	this.disable = function() {this.enabled = false; this._update();}
	this.frozen = false;
	this.unfreeze = function() {this.frozen = false; this._update();}
	this.freeze = function() {this.frozen = true; this._update();}
	this._update = function() { // updates disableDiv
		if (this.enabled == false || this.frozen == true) {
			this.btn.disabled = true;
			this.disableDiv.style.display = "block";
		} else {
			this.btn.disabled = false;
			this.disableDiv.style.display = "none";
		}
	}
	
	this.graphicLoopTimer = game.ph.time.events.loop(50, function() {THIS.setCd(THIS.cd-50/1000);});
	
	this.cast = function() {
		if (this.enabled == true && this.frozen == false) {
			var targetKey, targetX, targetY;
			if (game.me.selectedUnit != null) {targetKey = game.me.selectedUnit.key;} else {targetKey = "null";}
			targetX = game.ph.input.worldX; targetY = game.ph.input.worldY;
			//this.disable();
			//game.ph.time.events.add(THIS.cdMax*1000, function() {THIS.enable();});
			//setTimeout(function() {THIS.enable();}, THIS.cdMax*1000);
			//game.me.spells.freezeAll();
			//game.ph.time.events.add(500, function() {game.me.spells.unfreezeAll();});
			ws.send("/cast "+this.code+" "+targetKey+" "+targetX+" "+targetY);
			//this.setCd(0.5, 0.5);
		}
	}
	this.setCd = function(cd, cdMax) {
		if (cd < 0) {cd = 0;}
		this.cd = cd;
		if (typeof cdMax !== 'undefined') {this.cdMax = cdMax;}
		var coef = this.cd / this.cdMax;
		this.cdBar.style.width = (coef * 100) + "%";
	}
	this.remove = function() {
		this.btn.parentNode.removeChild(this.btn);
		delete game.me.spells[this.code]; delete this;
	}
}