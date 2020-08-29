define([
    "skylark-langx/langx",
    "./borders"
], function(langx,borders) {

	var BorderStyleType = ["none","solid","ridge","groove","inset","outset","double","dotted","dashed"];

	langx.mixin(BorderStyleType,{
		"none" : 0,
		"solid" : 1, 
		"ridge" : 2,
		"groove" : 3,
		"inset" : 4,
		"outset" : 5,
		"double" : 6,
		"dotted" : 7,
		"dashed" : 8
	});

	return borders.BorderStyleType = BorderStyleType;

});
