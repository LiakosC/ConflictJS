/*
var client = new NodeClient("ws://ip:port");
client.io.off("game");
client.io.on("game", function(json) {
	// code
	if (NodeClient.filter(json, "json_key", [keys_needed])) {
		
	}
});
*/

var NodeClient = function(url) {
	var THIS = this;
	this.url = url;
	this.io = io(this.url, {reconnection: false, autoConnect: false});
	
	this.io.on("connect", function(data) {console.log("Connected.");});
	this.io.on("connect_error", function(data) {console.log("Could not connect.");});
	this.io.on("disconnect", function(data) {console.log("Disconnected.");});
	this.io.on("error", function(data) {console.log("Error.", data);});
	
	var PREFIX = "[NodeClient]";
	this.report = function(str) {
		console.log(PREFIX, str);
	};	
};
NodeClient.objectHasKeys = function(object, keysArray) {
	var ok = true;
	for (var i=0; i<keysArray.length; i++) {
		var key = keysArray[i];
		if (object[key] == null) {
			ok = false;
			break;
		}
	}
	//console.log(ok);
	return ok;
};
NodeClient.filter = function(serverJSON, key, arrayNeeded, subJSON) {
	if (serverJSON[key] == null) {return false;}
	if (NodeClient.objectHasKeys(serverJSON[key], arrayNeeded)) {
		//console.log("has");
		return true;
	} else {
		//console.log("doesnt have");
		return false;
	}
};




var WarAction = function() {
	var THIS = this;
	this.serverTimeKey = "t";
	this.shadowDelay = 100;
	this.jsonBuffer = []; /* [{t:x, actionKey: {} }] */
	this.scanInterval = setInterval(function() {
		var now = Date.now();
		var flag = true;
		var i = 0;
		while (flag) { // scan through the buffer
			if (i >= THIS.jsonBuffer.length) { // if you reach the end of buffer, exit
				flag = false;
			} else { // if scanning inside buffer
				//console.log("buffer", THIS.jsonBuffer);
				var json = THIS.jsonBuffer[i];
				var serverT = json[THIS.serverTimeKey] || 0;
				if (now - THIS.shadowDelay >= serverT) {
					THIS.play(json);
					THIS.jsonBuffer.splice(i, 1);
					//console.log("playing", json);
					i--;
				} else { // time not yet reached
					flag = false;
				}
			}
			i++;
		}
		//console.log(THIS.jsonBuffer);
	}, 0);
	
	this.play = function(json) {} // overwrite this function :)
	
	this.receive = function(json) { // json should have json.t ("t" == this.serverTimeKey) and json['customAction'] = {...}
		if (THIS.autoShadowDelay) {
			if (json[this.serverTimeKey] != null) {
				var serverDelay = Date.now() - json[this.serverTimeKey];
				newServerDelay(serverDelay);
			}
		}
		this.jsonBuffer.push(json);
		//console.log("new buffer", this.jsonBuffer);
	};
	
	this.autoShadowDelay = true;
	
	var serverDelaysBuffer = []; // max 10
	var getServerDelayAverage = function() {
		if (serverDelaysBuffer.length > 0) {
			var sum = 0;
			for (var i=0; i<serverDelaysBuffer.length; i++) {
				sum += serverDelaysBuffer[i];
			} return sum / serverDelaysBuffer.length;
		} else {return 0;}
	};
	var newServerDelay = function(serverDelay) {
		serverDelaysBuffer.push(serverDelay);
		//console.log(serverDelaysBuffer);
		//console.log(serverDelay);
		if (serverDelaysBuffer.length > 10) {serverDelaysBuffer.splice(0, 1);}
		if (serverDelaysBuffer.length > 0) { // 3 and more needed (?)
			THIS.shadowDelay = getServerDelayAverage() * 2 + 50;	
			//console.log("new shadowDelay", THIS.shadowDelay);
		}
	};
};





	









