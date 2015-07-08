define([],function(){
	console.log("Module Admin is loaded");
	return {
			name : "administrator",
			getRoleDescription : function(){
				return "My role is " + this.name;
			}
	};
});