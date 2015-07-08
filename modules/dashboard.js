define(['modules/engine.js','modules/data.js'],function(Engine,data){
	console.log("Module Dashboard is loaded");
	var engine = new Engine();

	return function(){
		var version = engine.getVersion();
		this.isActive = function(){
			return false;
		};
		this.start = function(){};
	};
});