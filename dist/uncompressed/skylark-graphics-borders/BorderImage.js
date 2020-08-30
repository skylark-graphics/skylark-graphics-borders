define([
    "skylark-langx/langx",
    "skylark-graphics-brushes/ImageBrush",
    "./borders",
    "./BorderImageOutset",
    "./BorderImageRepeat",
    "./BorderImageSlice"
],function(
    langx,
    BorderImageSlice,
    borders,
    ImageBrush,
    BorderImageOutset,
    BorderImageRepeat
) {
    var BorderImage = langx.klass({
       
        "klassName"  :   "BorderImage",

        "outset"    :   {
            type : BorderImageOutset,
            "get" : function() {
                return this._.outset;
            },
            "set" : function(v) {
                this._.outset = v;
            }            
        },
        "repeat" :   {
            type : BorderImageRepeat,
            "get" : function() {
                return this._.repeat;
            },
            "set" : function(v) {
                this._.repeat = v;
            }            
        },
        "slice"    :   {
            type : BorderImageSlice,
            "get" : function() {
                return this._.slice;
            },
            "set" : function(v) {
                this._.slice = v;
            }            
        },
        "source"  :   {
            type : ImageBrush,
            "get" : function() {
                return this._.source;
            },
            "set" : function(v) {
                this._.source = v;
            }            
        },
        "width"    :   {
            //type : MeasureValue,
            "get" : function() {
                return this._.width;
            },
            "set" : function(v) {
                this._.width = v;
            }            
        },
        "_construct" : function(params){
            this._ = {
                outset : params.outset,
                repeat : params.repeat,
                slice  : params.slice,
                source : params.source,
                width  : params.width
            };
        }
    });

    BorderImage.fromPlain = function(o) {

       return new BorderImage({
            outset : o.outset,
            repeat    : o.repeat,
            slice    : o.slice,
            source      : o.source,
            width: o.width
        });
    };

    BorderImage.fromCss = function(css) {
        return BorderImage.fromPlain({
            outset  : css.borderImageOutset,
            repeat  : css.borderImageRepeat,
            slice   : css.borderImageSlice,
            source  : css.borderImageSource,
            width   : css.borderImageWidth
        });
    };

    BorderImage.toCss = function(bi,css) {
        if (!css) {
            css = {};
        }

        if (bi && bi.outset) {
            css.borderImageOutset = bi.outset.toString();
        }

        if (bi && bi.repeat) {
            css.borderImageRepeat = BorderImageRepeat[bi.repeat]; // bi.repeat.toString();
        }

        if (bi && bi.slice) {
            css.borderImageSlice = bi.slice.toString();
        }

        if (bi && bi.source) {
            css.borderImageSource = bi.source.toString();        
        }

        if (bi && bi.width) {
            css.borderImageWidth = bi.width.toString();        
        }


        return css;
    };

    return borders.BorderImage = BorderImage;
    
}); 
