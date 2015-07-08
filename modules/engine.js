define([],function(){
	console.log("Module Engine is loaded");
	return function(){
		this.name = "engine";
		this.getVersion = function(){
			return "0.0.1";
		};
		this.isStarted = function(){
			return false;
		};
	};
});