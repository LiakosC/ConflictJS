/*
requires: http, socket.io
optional: mysql, sha256

var server = new NodeServer("127.0.0.1", 9000); // host, port. host is for mysql server

server.mysql_user = "root";
server.mysql_password = "";
server.mysql_database = "my_database";
var mylink = server.mysql_connect(); // connect only once
(mylink == server.mysql_link true)

server.io.on("connection", function(client) {
	client.emit("hi_idiot", {server_name: "Epic Server});
	client.removeAllListeners("disconnect");
	client.on("disconnect", function() {
		// better use client.id in local clients buffer
	});
});

var hashedPassword = server.hash256(some_password);

server.runtime = function(dt) {
	// run anything. dt: ms
}

// using mysql
server.mysql_host = "127.0.0.1";
server.mysql_user = "root";
server.mysql_password = "";
server.mysql_database = "my_database";
server.mysql_connect();
// use server.mysql_link

server.mysql_link.query("select\
	* from table where\
	id=1992 and secret=? and secret2=?", [secret1, secret2], function(err, rows) {
	if (!err) {
		// used rows
	}
});
*/



var NodeServer = function(port) {
	
	var THIS = this;
	
	this.port = port;

	this.mysql = require("mysql") || null;
	this.mysql_host = "127.0.0.1";
	this.mysql_user = "root";
	this.mysql_password = "";
	this.mysql_database = "";
	this.mysql_link = null;
	this.mysql_connect = function() {
		this.mysql_link = this.mysql.createConnection({
			host: 		THIS.host, 
			user: 		THIS.mysql_user, 
			password: 	THIS.mysql_password, 
			database: 	THIS.mysql_database
		}) || null;
	}
	
	this.io = require("socket.io")(require("http").createServer().listen(port));
	
	this.hash256 = function(password) {return require("sha256")(password);}
	
	this.time_get = function() {return Date.now();}
	this.time_now = this.time_get();
	this.time_interval = setInterval(function() {
		var new_now = THIS.time_get();
		var dt = new_now - THIS.time_now;
		THIS.time_now = new_now;
		THIS.runtime(dt);
	});
	
	this.runtime = function() {}
	
	this.objectSize = function(object) {
		return encodeURI(JSON.stringify(object)).split(/%..|./).length - 1;
	}
}
module.exports = NodeServer;
