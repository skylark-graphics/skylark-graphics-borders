define([
    "skylark-langx/langx",
    "./borders"
], function(langx,borders) {

	var BorderImageRepeat = ["repeat","round","stretch"];
	
	langx.mixin(BorderImageRepeat,{
		"repeat" : 0,
		"round" : 1,
		"stretch" : 2
	});

	return borders.BorderImageRepeat = BorderImageRepeat;

});
