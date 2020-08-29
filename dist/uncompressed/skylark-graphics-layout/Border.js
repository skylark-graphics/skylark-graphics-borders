define([
	"skylark-langx/langx",
	"./borders",
	"./BorderColor",
	"./BorderImage",
	"./BorderRadius",
	"./BorderStyle",
	"./BorderWidth"
],function(langx,borders,BorderColor,BorderImage,BorderRadius,BorderStyle,BorderWidth) {
	var Border = langx.klass({
		"color"	:	{
			"type"	:	BorderColor,
			"get" : function() {
				return this._.color;
			},
			"set" : function(v) {
				this._.color = v;
			}
		},

		"image"	:	{
			"type"	:	BorderImage,
			"get" : function() {
				return this._.image;
			},
			"set" : function(v) {
				this._.image = v;
			}
		},

		"radius"	:	{
			"type"		:	BorderRadius,
			"get" : function() {
				return this._.radius;
			},
			"set" : function(v) {
				this._.radius = v;
			}
		},

		"style"	:	{
			"type"	:	BorderStyle,
			"get" : function() {
				return this._.style;
			},
			"set" : function(v) {
				this._.style = v;
			}
		},

		"width"	:	{
			"type"	:	BorderWidth,
			"get" : function() {
				return this._.width;
			},
			"set" : function(v) {
				this._.width = v;
			}
		},

		toCss : function(css) {
			return Border.toCss(this,css);
		},

		"_construct" : function(params){
			this._ = {
				color : params.color,
				image 	  : params.image,
				radius 	  : params.radius,
				style 	  : params.style,
				width: params.width

			};
		}
	});

	Border.fromCss = function(css) {
        return new Border({
			color 	: BorderColor.fromCss(css),
			image 	: BorderImage.fromCss(css),
			radius  : BorderRadius.fromCss(css),
			style 	: BorderStyle.fromCss(css),
			width   : BorderWidth.fromCss(css)
       });
	};

	Border.toCss = function(border,css) {
        if (!css) {
        	css = {};
        }

        BorderColor.toCss(border.color,css);
        BorderImage.toCss(border.image,css);
        BorderRadius.toCss(border.radius,css);
        BorderStyle.toCss(border.color,css);
        BorderWidth.toCss(border.color,css);

        return css;
	};

	return borders.Border = Border;
	
});	
