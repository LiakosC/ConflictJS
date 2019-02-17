

//console.log("Requiring Spell.js");

var Spell = function(code, unit) {
	if (typeof game.data.spells[code] === 'undefined') {
		console.log("spell " + code + " doesn't exist");
		return;
	}
	this.data 				= game.data.spells[code];
	this.code				= code;
	this.unit				= unit;
	this.unit.spells[code] = this;
	this.oncastCallback 	= this.data.oncast;
	this.cd 					= 0;
	this.cdMax				= this.data.cd;
	this.oncd 				= false;
	/*
	if ($this->unit->isPlayer) {
		$game['send_player']("/spellCd ".$this->code." 0 ".$this->cd."<#>/spellEnabled ".$this->code, $this->unit->player);
	}
	*/
	this.oncast = function(callback) {this.oncastCallback = callback;}
	this.cooldown = function() {
		if (this.unit.isPlayer) {
			game.send_player("spell", {code: this.code, cd: this.cdMax, cdMax: this.cdMax, enabled: false}, this.unit.player);
		}
	}
	this.cast = function(target, x, y) {
		if (this.oncd == false) {
			if (this.oncastCallback !== null) {
				var callback = this.oncastCallback;
				callback(this, this.unit, target, x, y);
			}
		} else {
			if (this.unit.isPlayer) {
				//$game['send_player']("/error Spell is on cooldown", $this->unit->player);
			}
		}
	}
	this.remove = function() {
		delete this.unit.spells[this.code];
	}
}

module.exports = Spell;