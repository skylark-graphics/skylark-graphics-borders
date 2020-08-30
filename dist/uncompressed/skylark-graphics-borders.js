/**
 * skylark-graphics-borders - The skylark border class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-graphics-borders/borders',[
	"skylark-langx/skylark"
],function(skylark){
	return skylark.attach("graphics.borders",{});
});
define('skylark-graphics-borders/BorderColor',[
    "skylark-langx/langx",
    "skylark-graphics-color",
    "./borders"
], function(langx,Color,borders) {

    var _WIDTH_R = /\d+/,
        _WIDTHS_R = /\d*\D*\s*/g;

    var BorderColor = langx.klass({
        "klassName": "BorderColor",

        "left": {
            "type": Color,
            "alias" : "l",
            "get" : function() {
                return this._.left;
            },
            "set" : function(v) {
                this._.left = v;
            }            
        },

        "top": {
            "type": Color,
            "alias" : "t",
            "get" : function() {
                return this._.top;
            },
            "set" : function(v) {
                this._.top = v;
            }            
        },

        "right": {
            "type": Color,
            "alias" : "r",
            "get" : function() {
                return this._.right;
            },
            "set" : function(v) {
                this._.right = v;
            }            
        },

        "bottom": {
            "type": Color,
            "alias" : "b",
            "get" : function() {
                return this._.bottom;
            },
            "set" : function(v) {
                this._.bottom = v;
            }            
        },

        getAll: function() {
            if (this.left == this.bottom && this.top == this.right && this.right == this.left) {
                return this.left;
            } else {
                return null;
            }
        },

        setAll: function(a) {
            this._setupAttributeValues({
                "left": a,
                "right": a,
                "top": a,
                "bottom": a
            });
        },
        "clone" : function(){
            var _ = this._;
            return new BorderColor(_.top,_.right,_.left,_.bottom);
        
        },
        equal: function(target) {
            return !this.notEqual(target);
        },

        notEqual: function(target) {
            if (!target) {
                return false;
            } 
            var s1 = this.toString(),
                s2 = target.toString();
            return s1 != s2 ;
        },

        toArray : function() {
            return [this.top,this.right,this.left,this.bottom];
        },

        toPlain : function() {
            return {
                "t"  : this.top,
                "r"  : this.right,
                "l"  : this.left,
                "b"  : this.bottom
            }
        },
        "toString": function() {
            var count = 0,
                l = this.left.toString(),
                t = this.top.toString(),
                r = this.right.toString(),
                b = this.bottom.toString();
            if (r == l) {
                if (t == b) {
                    if (t == r) {
                        return t.toString();
                    } else {
                        return t + " " + r;
                    }
                } else {
                    return t + " " + r + " " + b;
                }
            } else {
                return t + " " + r + " " + l + " " + b;
            }

        },
        "_construct": function(/*Number*/t, /*Number*/r, /*Number*/l, /*Number*/b) {
            if (b === undefined) {
                if (l !== undefined) {
                    b = l;
                    l = r;
                } else if (r !== undefined) {
                    b = t;
                    l = r;

                } else if (t !== undefined) {
                    b = l = r = t;
                } else {
                    b = l = r = t = 0;
                }
            }
            this._ = {
                "left": l,
                "right": r,
                "top": t,
                "bottom": b
            };
        }
    });

    langx.mixin(BorderColor, {
        "fromArray" : function(a) {
            switch (a.length) {
                case 1 : return new BorderColor(a[0],a[0],a[0],a[0]);
                case 2 : return new BorderColor(a[0],a[1],a[1],a[0]);
                case 3 : return new BorderColor(a[0],a[1],a[1],a[0]);
                case 4 : return new BorderColor(a[0],a[1],a[1],a[0]);
                default : return;
            }
        },
        "fromPlain" : function(o) {
            return new BorderColor(o.t,o.r,o.l,o.b);
        },
        "fromString": function(s) {
           var a = s.match(_WIDTHS_R);
            var t,
                r,
                l,
                b,
                len = a.length;
            //for (var i = 0; i < len; i++) {
            //    a[i] = _WIDTH_R.exec(a[i]);
            //    a[i] = parseInt(a[i]);
            //}
            switch (len) {
                case 1:
                    t = r = l = b = a[0];
                    break;

                case 2:
                    t = b = a[0];
                    r = l = a[1];
                    break;
                case 3:
                    t = a[0];
                    r = l = a[1];
                    b = a[2]
                    break;
                case 4:
                    t = a[0];
                    r = a[1];
                    l = a[2]
                    b = a[3];
                    break;
            }
            return new BorderColor(t,r,l,b);
        }
    });

    BorderColor.fromCss = function(css) {
       if (css.borderTopColor!==undefined &&
           css.borderRightColor!==undefined &&
           css.borderLeftColor!==undefined &&
           css.borderBottomColor!==undefined ) {
           return new BorderColor(
                        css.borderTopColor,
                        css.borderRightColor,
                        css.borderLeftColor,
                        css.borderBottomColor
                    );

        } else {
            return null;
        }
    };

    BorderColor.toCss = function(bc,css) {
        if (!css) {
            css = {};
        }
        if (bc) {
            css.borderTopColor = bc.top.toString();
            css.borderRightColor = bc.right.toString();
            css.borderLeftColor = bc.left.toString();
            css.borderBottomColor= bc.bottom.toString();
        }

        return css;
    };

    return borders.BorderColor = BorderColor;
});

define('skylark-graphics-borders/BorderImageOutset',[
    "skylark-langx/langx",
    "./borders"
], function(langx,borders) {
    var _WIDTH_R = /\d+/,
        _WIDTHS_R = /\d+\s*/g;

    var BorderImageOutset = langx.klass({

        "klassName": "BorderImageOutset",

        "left": {
            "type": Number,
            "alias" : "l",
            "get" : function() {
                return this._.left;
            },
            "set" : function(v) {
                this._.left = v;
            }            
        },

        "top": {
            "type": Number,
            "alias" : "t",
            "get" : function() {
                return this._.top;
            },
            "set" : function(v) {
                this._.top = v;
            }            
        },

        "right": {
            "type": Number,
            "alias" : "r",
            "get" : function() {
                return this._.right;
            },
            "set" : function(v) {
                this._.right = v;
            }            
        },

        "bottom": {
            "type": Number,
            "alias" : "b",
            "get" : function() {
                return this._.bottom;
            },
            "set" : function(v) {
                this._.bottom = v;
            }            
        },


        getAll: function() {
            if (this.left == this.bottom && this.top == this.right && this.right == this.left) {
                return this.left;
            } else {
                return null;
            }
        },

        setAll: function(a) {
            this._setupAttributeValues({
                "left": a,
                "right": a,
                "top": a,
                "bottom": a
            });
        },
        "clone" : function(){
            var _ = this._;
            return new BorderImageOutset(_.top,_.right,_.left,_.bottom);
        
        },
        equale: function(target) {
            return !this.notEqual(target);
        },

        notEqual: function(target) {
            return !target ||
                    this.left != target.left ||
                    this.top != target.top ||
                    this.right != target.right ||
                    this.bottom != target.bottom;
        },

        toArray : function() {
            return [this.top,this.right,this.left,this.bottom];
        },

        toPlain : function() {
            return {
                "t"  : this.top,
                "r"  : this.right,
                "l"  : this.left,
                "b"  : this.bottom
            }
        },
        "toString": function() {
            var count = 0,
                l = this.left.toString(),
                t = this.top.toString(),
                r = this.right.toString(),
                b = this.bottom.toString();
            if (r == l) {
                if (t == b) {
                    if (t == r) {
                        return t.toString();
                    } else {
                        return t + " " + r;
                    }
                } else {
                    return t + " " + r + " " + b;
                }
            } else {
                return t + " " + r + " " + l + " " + b;
            }

        },
        "_construct": function(/*Number*/t, /*Number*/r, /*Number*/l, /*Number*/b) {
            if (b === undefined) {
                if (l !== undefined) {
                    b = l;
                    l = r;
                } else if (r !== undefined) {
                    b = t;
                    l = r;

                } else if (t !== undefined) {
                    b = l = r = t;
                } else {
                    b = l = r = t = 0;
                }
            }
            this._ = {
                "left": l,
                "right": r,
                "top": t,
                "bottom": b
            };
        }
    });

    Object.mixin(BorderImageOutset, {
        "fromArray" : function(a) {
            switch (a.length) {
                case 1 : return new BorderImageOutset(a[0],a[0],a[0],a[0]);
                case 2 : return new BorderImageOutset(a[0],a[1],a[1],a[0]);
                case 3 : return new BorderImageOutset(a[0],a[1],a[1],a[0]);
                case 4 : return new BorderImageOutset(a[0],a[1],a[1],a[0]);
                default : return;
            }
        },
        "fromPlain" : function(o) {
            return new BorderImageOutset(o.t,o.r,o.l,o.b);
        },
        "fromString": function(s) {
           var a = s.match(_WIDTHS_R);
            var t,
                r,
                l,
                b,
                len = a ? a.length : 0;
            //for (var i = 0; i < len; i++) {
            //    a[i] = _WIDTH_R.exec(a[i]);
            //    a[i] = parseInt(a[i]);
            //}
            switch (len) {
                case 1:
                    t = r = l = b = a[0];
                    break;

                case 2:
                    t = b = a[0];
                    r = l = a[1];
                    break;
                case 3:
                    t = a[0];
                    r = l = a[1];
                    b = a[2]
                    break;
                case 4:
                    t = a[0];
                    r = a[1];
                    l = a[2]
                    b = a[3];
                    break;
                default :
                    t = r = l = b = null;
                    break;                    
            }
            return new BorderImageOutset(t,r,l,b);
        },

        Zero: new BorderImageOutset(0)
    });

    BorderImageOutset.fromCss = function(css) {
        if (css.borderImageOutset) {
            return BorderImageOutset.fromString(css.borderImageOutset);
       } else {
            return null;
       }
    };

    BorderImageOutset.toCss = function(bio,css) {
        if (!css) {
            css = {};
        }
        if (bio) {
            css.borderImageOutset = bio.toString();
        }

        return css;
    };

    return borders.BorderImageOutset = BorderImageOutset;
});

define('skylark-graphics-borders/BorderImageRepeat',[
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

define('skylark-graphics-borders/BorderImageSlice',[
    "skylark-langx/langx",
    "./borders"
], function(langx,borders) {
    var _WIDTH_R = /\d+/,
        _WIDTHS_R = /\d+\D*\s*/g;

    var BorderImageSlice = langx.klass({

        "klassName": "BorderImageSlice",

        "left": {
            "type": Number,
            "alias" : "l",
            "get" : function() {
                return this._.left;
            },
            "set" : function(v) {
                this._.left = v;
            }            
        },

        "top": {
            "type": Number,
            "alias" : "t",
            "get" : function() {
                return this._.top;
            },
            "set" : function(v) {
                this._.top = v;
            }            
        },

        "right": {
            "type": Number,
            "alias" : "r",
            "get" : function() {
                return this._.right;
            },
            "set" : function(v) {
                this._.right = v;
            }            
        },

        "bottom": {
            "type": Number,
            "alias" : "b",
            "get" : function() {
                return this._.bottom;
            },
            "set" : function(v) {
                this._.bottom = v;
            }            
        },


        getAll: function() {
            if (this.left == this.bottom && this.top == this.right && this.right == this.left) {
                return this.left;
            } else {
                return null;
            }
        },

        setAll: function(a) {
            this._setupAttributeValues({
                "left": a,
                "right": a,
                "top": a,
                "bottom": a
            });
        },
        "clone" : function(){
            var _ = this._;
            return new BorderImageSlice(_.top,_.right,_.left,_.bottom);
        
        },
        equale: function(target) {
            return !this.notEqual(target);
        },

        notEqual: function(target) {
            return !target ||
                    this.left != target.left ||
                    this.top != target.top ||
                    this.right != target.right ||
                    this.bottom != target.bottom;
        },

        toArray : function() {
            return [this.top,this.right,this.left,this.bottom];
        },

        toPlain : function() {
            return {
                "t"  : this.top,
                "r"  : this.right,
                "l"  : this.left,
                "b"  : this.bottom
            }
        },
        "toString": function() {
            var count = 0,
                l = this.left <0 ? "fill" : this.left.toString(),
                t = this.top <0 ? "fill" : this.top.toString(),
                r = this.right <0 ? "fill" : this.right.toString(),
                b = this.bottom <0 ? "fill" : this.bottom.toString();

            if (r == l) {
                if (t == b) {
                    if (t == r) {
                        return t.toString();
                    } else {
                        return t + " " + r;
                    }
                } else {
                    return t + " " + r + " " + b;
                }
            } else {
                return t + " " + r + " " + l + " " + b;
            }

        },
        "_construct": function(/*Number*/t, /*Number*/r, /*Number*/l, /*Number*/b) {
            if (b === undefined) {
                if (l !== undefined) {
                    b = l;
                    l = r;
                } else if (r !== undefined) {
                    b = t;
                    l = r;

                } else if (t !== undefined) {
                    b = l = r = t;
                } else {
                    b = l = r = t = 0;
                }
            }
            this._ = {
                "left": l,
                "right": r,
                "top": t,
                "bottom": b
            };
        }
    });

    Object.mixin(BorderImageSlice, {
        "fromArray" : function(a) {
            switch (a.length) {
                case 1 : return new BorderImageSlice(a[0],a[0],a[0],a[0]);
                case 2 : return new BorderImageSlice(a[0],a[1],a[1],a[0]);
                case 3 : return new BorderImageSlice(a[0],a[1],a[1],a[0]);
                case 4 : return new BorderImageSlice(a[0],a[1],a[1],a[0]);
                default : return;
            }
        },
        "fromPlain" : function(o) {
            return new BorderImageSlice(o.t,o.r,o.l,o.b);
        },
        "fromString": function(s) {
           var a = s.match(_WIDTHS_R);
            var t,
                r,
                l,
                b,
                len = a ? a.length : 0;
            //for (var i = 0; i < len; i++) {
            //    a[i] = _WIDTH_R.exec(a[i]);
            //    a[i] = parseInt(a[i]);
            //}
            switch (len) {
                case 1:
                    t = r = l = b = a[0];
                    break;

                case 2:
                    t = b = a[0];
                    r = l = a[1];
                    break;
                case 3:
                    t = a[0];
                    r = l = a[1];
                    b = a[2]
                    break;
                case 4:
                    t = a[0];
                    r = a[1];
                    l = a[2]
                    b = a[3];
                    break;
                 default :
                    t = r = l = b = null;
                    break;                    
           }
            if (t=="fill") {
                t = -1;
            }
            if (r=="fill") {
                r = -1;
            }
            if (l=="fill") {
                l = -1;
            }
            if (b=="fill") {
                b = -1;
            }
            return new BorderImageSlice(t,r,l,b);
        },

        Zero: new BorderImageSlice(0)
    });

    BorderImageSlice.fromCss = function(css) {
        if (css.borderImageSlice != undefined) {
            return BorderImageSlice.fromString(css.borderImageSlice);
        } else {
            return null;
        }
    };

    BorderImageSlice.toCss = function(bis,css) {
        if (!css) {
            css = {};
        }
        if (bis) {
            css.borderImageSlice = bis.toString();
        }

        return css;
    };

    return borders.BorderImageSlice = BorderImageSlice;
});

define('skylark-graphics-borders/BorderImage',[
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
            type : MeasureValue,
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
            css.borderImageRepeat = bi.repeat.toString();
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

define('skylark-graphics-borders/BorderRadius',[
    "skylark-langx/langx",
    "./borders"
], function(langx,borders) {
    var _WIDTH_R = /\d+/,
        _WIDTHS_R = /\d+\D*\s*/g;

    var BorderRadius = langx.klass({
        "klassName": "BorderRadius",

        "topLeft": {
            "alias" : "tl",
            "get" : function() {
                return this._.topLeft;
            },
            "set" : function(v) {
                this._.topLeft = v;
            }  
        },

        "topRight": {
            "alias" : "tr",
            "get" : function() {
                return this._.topRight;
            },
            "set" : function(v) {
                this._.topRight = v;
            }  
        },

        "bottomRight": {
            "alias" : "br",
            "get" : function() {
                return this._.bottomRight;
            },
            "set" : function(v) {
                this._.bottomRight = v;
            }  
        },

        "bottomLeft": {
            "alias" : "bl",
            "get" : function() {
                return this._.bottomLeft;
            },
            "set" : function(v) {
                this._.bottomLeft = v;
            }  

        },

        getAll: function() {
            if (this.topLeft == this.topRight && this.topLeft == this.bottomRight && this.topLeft == this.bottomLeft) {
                return this.topLeft;
            } else {
                return null;
            }
        },

        setAll: function(a) {
            this._setupAttributeValues({
                "topLeft": a,
                "topRight": a,
                "bottomRight": a,
                "bottomLeft": a
            });
        },
        "clone" : function(){
            var _ = this._;
            return new BorderRadius(_.topLeft,_.topRight,_.bottomRight,_.bottomLeft);
        
        },
        equal: function(target) {
            return !this.notEqual(target);
        },

        notEqual: function(target) {
            if (!target) {
                return false;
            } 
            var s1 = this.toString(),
                s2 = target.toString();
            return s1 != s2 ;
        },

        toArray : function() {
            return [this.topLeft,this.topRight,this.bottomRight,this.bottomLeft];
        },

        toPlain : function() {
            return {
                "topLeft"  : this.topLeft,
                "topRight"  : this.topRight,
                "bottomRight"  : this.bottomRight,
                "bottomLeft"  : this.bottomLeft
            }
        },
        "toString": function() {
            var count = 0,
                l = this.topLeft.toString(),
                t = this.topRight.toString(),
                r = this.bottomRight.toString(),
                b = this.bottomLeft.toString();
            if (r == l) {
                if (t == b) {
                    if (t == r) {
                        return t.toString();
                    } else {
                        return t + " " + r;
                    }
                } else {
                    return t + " " + r + " " + b;
                }
            } else {
                return t + " " + r + " " + l + " " + b;
            }

        },
        "_construct": function(/*Number*/t, /*Number*/r, /*Number*/l, /*Number*/b) {
            if (b === undefined) {
                if (l !== undefined) {
                    b = l;
                    l = r;
                } else if (r !== undefined) {
                    b = t;
                    l = r;

                } else if (t !== undefined) {
                    b = l = r = t;
                } else {
                    b = l = r = t = 0;
                }
            }
            this._ = {
                "topLeft": l,
                "topRight": r,
                "bottomLeft": t,
                "bottomRight": b
            };
        }
    });

    Object.mixin(BorderRadius, {
        "fromArray" : function(a) {
            switch (a.length) {
                case 1 : return new BorderRadius(a[0],a[0],a[0],a[0]);
                case 2 : return new BorderRadius(a[0],a[1],a[1],a[0]);
                case 3 : return new BorderRadius(a[0],a[1],a[1],a[0]);
                case 4 : return new BorderRadius(a[0],a[1],a[1],a[0]);
                default : return;
            }
        },
        "fromPlain" : function(o) {
            return new BorderRadius(o.topLeft,o.topRight,o.bottomRight,o.bottomLeft);
        },
        "fromString": function(s) {
           var a = s.match(_WIDTHS_R);
            var t,
                r,
                l,
                b,
                len = a.length;
            //for (var i = 0; i < len; i++) {
            //    a[i] = _WIDTH_R.exec(a[i]);
            //    a[i] = parseInt(a[i]);
            //}
            switch (len) {
                case 1:
                    t = r = l = b = a[0];
                    break;

                case 2:
                    t = b = a[0];
                    r = l = a[1];
                    break;
                case 3:
                    t = a[0];
                    r = l = a[1];
                    b = a[2]
                    break;
                case 4:
                    t = a[0];
                    r = a[1];
                    l = a[2]
                    b = a[3];
                    break;
            }
            return new BorderRadius(t,r,l,b);
        }

    });

    BorderRadius.fromCss = function(css) {
        if (css.borderTopLeftRadius != undefined &&
            css.borderTopRightRadius != undefined &&
            css.borderBottomRightRadius != undefined &&
            css.borderBottomLeftRadius != undefined) {
            return new BorderRadius(
                        css.borderTopLeftRadius,
                        css.borderTopRightRadius,
                        css.borderBottomRightRadius,
                        css.borderBottomLeftRadius
                    );
        } else {
            return null;
        }
    };

    BorderRadius.toCss = function(br,css) {
        if (!css) {
            css = {};
        }
        if (br) {
            css.borderTopLeftRadius = br.topLeft.toString();
            css.borderTopRightRadius = br.topRight.toString();
            css.borderBottomRightRadius = br.bottomRight.toString();
            css.borderBottomLeftRadius = br.bottomLeft.toString();        
        }

        return css;
    };

    return BorderRadius;
});

define('skylark-graphics-borders/BorderStyleType',[
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

define('skylark-graphics-borders/BorderStyle',[
    "skylark-langx/langx",
    "./borders",
    "./BorderStyleType"
], function(langx,borders,BorderStyleType) {
    var _WIDTH_R = /\d+/,
        _WIDTHS_R = /\d*\D*\s*/g;

    var BorderStyle = langx.klass({
        "klassName": "BorderStyle",

        "left": {
            "type": Color,
            "alias" : "l",
            "get" : function() {
                return this._.left;
            },
            "set" : function(v) {
                this._.left = v;
            }            
        },

        "top": {
            "type": Color,
            "alias" : "t",
            "get" : function() {
                return this._.top;
            },
            "set" : function(v) {
                this._.top = v;
            }            
        },

        "right": {
            "type": Color,
            "alias" : "r",
            "get" : function() {
                return this._.right;
            },
            "set" : function(v) {
                this._.right = v;
            }            
        },

        "bottom": {
            "type": Color,
            "alias" : "b",
            "get" : function() {
                return this._.bottom;
            },
            "set" : function(v) {
                this._.bottom = v;
            }            
        },

        getAll: function() {
            if (this.left == this.bottom && this.top == this.right && this.right == this.left) {
                return this.left;
            } else {
                return null;
            }
        },

        setAll: function(a) {
            this._ = {
                "left": a,
                "right": a,
                "top": a,
                "bottom": a
            };
        },

        "clone" : function(){
            var _ = this._;
            return new BorderStyle(_.top,_.right,_.left,_.bottom);
        
        },

        equal: function(target) {
            return !this.notEqual(target);
        },

        notEqual: function(target) {
            if (!target) {
                return false;
            } 
            var s1 = this.toString(),
                s2 = target.toString();
            return s1 != s2 ;
        },

        toArray : function() {
            return [this.top,this.right,this.left,this.bottom];
        },

        toPlain : function() {
            return {
                "t"  : this.top,
                "r"  : this.right,
                "l"  : this.left,
                "b"  : this.bottom
            }
        },

        "toString": function() {
            var count = 0,
                l = this.left.toString(),
                t = this.top.toString(),
                r = this.right.toString(),
                b = this.bottom.toString();
            if (r == l) {
                if (t == b) {
                    if (t == r) {
                        return t.toString();
                    } else {
                        return t + " " + r;
                    }
                } else {
                    return t + " " + r + " " + b;
                }
            } else {
                return t + " " + r + " " + l + " " + b;
            }

        },

        "_construct": function(/*Number*/t, /*Number*/r, /*Number*/l, /*Number*/b) {
            if (b === undefined) {
                if (l !== undefined) {
                    b = l;
                    l = r;
                } else if (r !== undefined) {
                    b = t;
                    l = r;

                } else if (t !== undefined) {
                    b = l = r = t;
                } else {
                    b = l = r = t = 0;
                }
            }
            this._ = {
                "left": l,
                "right": r,
                "top": t,
                "bottom": b
            };
        }
    });

    Object.mixin(BorderStyle, {
        "fromArray" : function(a) {
            switch (a.length) {
                case 1 : return new BorderStyle(a[0],a[0],a[0],a[0]);
                case 2 : return new BorderStyle(a[0],a[1],a[1],a[0]);
                case 3 : return new BorderStyle(a[0],a[1],a[1],a[0]);
                case 4 : return new BorderStyle(a[0],a[1],a[1],a[0]);
                default : return;
            }
        },
        "fromPlain" : function(o) {
            return new BorderStyle(o.t,o.r,o.l,o.b);
        },
        "fromString": function(s) {
           var a = s.match(_WIDTHS_R);
            var t,
                r,
                l,
                b,
                len = a ? a.length : 0;
            //for (var i = 0; i < len; i++) {
            //    a[i] = _WIDTH_R.exec(a[i]);
            //    a[i] = parseInt(a[i]);
            //}
            switch (len) {
                case 1:
                    t = r = l = b = a[0];
                    break;

                case 2:
                    t = b = a[0];
                    r = l = a[1];
                    break;
                case 3:
                    t = a[0];
                    r = l = a[1];
                    b = a[2]
                    break;
                case 4:
                    t = a[0];
                    r = a[1];
                    l = a[2]
                    b = a[3];
                    break;
            }
            return new BorderStyle(t,r,l,b);
        }
    });

    BorderStyle.fromCss = function(css) {
        if (css.borderTopStyle != undefined &&
            css.borderRightStyle != undefined &&
            css.borderLeftStyle != undefined &&
            css.borderBottomStyle != undefined) {
           return new BorderStyle(
                        css.borderTopStyle,
                        css.borderRightStyle,
                        css.borderLeftStyle,
                        css.borderBottomStyle
                    );
        } else {
            return null;
        }
    };

    BorderStyle.toCss = function(bs,css) {
        if (!css) {
            css = {};
        }
        if (bs) {
            css.borderTopStyle = bs.top.toString();
            css.borderRightStyle = bs.right.toString();
            css.borderLeftStyle = bs.left.toString();
            css.borderBottomStyle= bs.bottom.toString();
        }

        return css;
    };

    return borders.BorderStyle = BorderStyle;
});

define('skylark-graphics-borders/BorderWidth',[
    "skylark-langx/langx",
    "./borders"
], function(langx,borders) {
    
    var _WIDTH_R = /\d+/,
        _WIDTHS_R = /\d+\D*\s*/g;

    var BorderWidth = langx.klass({
        "klassName": "BorderWidth",

        "left": {
            "alias" : "l",
            "get" : function() {
                return this._.left;
            },
            "set" : function(v) {
                this._.left = v;
            }            
        },

        "top": {
            "alias" : "t",
            "get" : function() {
                return this._.top;
            },
            "set" : function(v) {
                this._.top = v;
            }            
        },

        "right": {
            "alias" : "r",
            "get" : function() {
                return this._.right;
            },
            "set" : function(v) {
                this._.right = v;
            }            
        },

        "bottom": {
            "alias" : "b",
            "get" : function() {
                return this._.bottom;
            },
            "set" : function(v) {
                this._.bottom = v;
            }            
        },

        getAll: function() {
            if (this.left == this.bottom && this.top == this.right && this.right == this.left) {
                return this.left;
            } else {
                return null;
            }
        },

        setAll: function(a) {
            this._setupAttributeValues({
                "left": a,
                "right": a,
                "top": a,
                "bottom": a
            });
        },
        "clone" : function(){
            var _ = this._;
            return new BorderWidth(_.top,_.right,_.left,_.bottom);
        
        },
        equal: function(target) {
            return !this.notEqual(target);
        },

        notEqual: function(target) {
            if (!target) {
                return false;
            } 
            var s1 = this.toString(),
                s2 = target.toString();
            return s1 != s2 ;
        },
        toArray : function() {
            return [this.top,this.right,this.left,this.bottom];
        },

        toPlain : function() {
            return {
                "t"  : this.top,
                "r"  : this.right,
                "l"  : this.left,
                "b"  : this.bottom
            }
        },
        "toString": function() {
            var count = 0,
                l = this.left.toString(),
                t = this.top.toString(),
                r = this.right.toString(),
                b = this.bottom.toString();
            if (r == l) {
                if (t == b) {
                    if (t == r) {
                        return t.toString();
                    } else {
                        return t + " " + r;
                    }
                } else {
                    return t + " " + r + " " + b;
                }
            } else {
                return t + " " + r + " " + l + " " + b;
            }
        },

        "_construct": function(/*Number*/t, /*Number*/r, /*Number*/l, /*Number*/b) {
            if (b === undefined) {
                if (l !== undefined) {
                    b = l;
                    l = r;
                } else if (r !== undefined) {
                    b = t;
                    l = r;

                } else if (t !== undefined) {
                    b = l = r = t;
                } else {
                    b = l = r = t = 0;
                }
            }
            this._ = {
                "left": l,
                "right": r,
                "top": t,
                "bottom": b
            };
        }
    });

    Object.mixin(BorderWidth, {
        "fromArray" : function(a) {
            switch (a.length) {
                case 1 : return new BorderWidth(a[0],a[0],a[0],a[0]);
                case 2 : return new BorderWidth(a[0],a[1],a[1],a[0]);
                case 3 : return new BorderWidth(a[0],a[1],a[1],a[0]);
                case 4 : return new BorderWidth(a[0],a[1],a[1],a[0]);
                default : return;
            }
        },
        "fromPlain" : function(o) {
            return new BorderWidth(o.t,o.r,o.l,o.b);
        },
        "fromString": function(s) {
           var a = s.match(_WIDTHS_R);
            var t,
                r,
                l,
                b,
                len = a ? a.length : 0;
            //for (var i = 0; i < len; i++) {
            //    a[i] = _WIDTH_R.exec(a[i]);
            //    a[i] = parseInt(a[i]);
            //}
            switch (len) {
                case 1:
                    t = r = l = b = a[0];
                    break;

                case 2:
                    t = b = a[0];
                    r = l = a[1];
                    break;
                case 3:
                    t = a[0];
                    r = l = a[1];
                    b = a[2]
                    break;
                case 4:
                    t = a[0];
                    r = a[1];
                    l = a[2]
                    b = a[3];
                    break;
                 default :
                    t = r = l = b = null;
                    break;                    
           }
            return new BorderWidth(t,r,l,b);
        },

        Zero: new BorderWidth(0)
    });

    BorderWidth.fromCss = function(css) {
       return new BorderWidth(
                    css.borderTopWidth,
                    css.borderRightWidth,
                    css.borderLeftWidth,
                    css.borderBottomWidth
                );
    };

    BorderWidth.toCss = function(bw,css) {
        if (!css) {
            css = {};
        }
        if (bw) {
            css.borderTopWidth = bw.top.toString();
            css.borderRightWidth = bw.right.toString();
            css.borderLeftWidth = bw.left.toString();
            css.borderBottomWidth = bw.bottom.toString();
        }

        return css;
    };

    return borders.BorderWidth = BorderWidth;
});

define('skylark-graphics-borders/Border',[
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

define('skylark-graphics-borders/main',[
	"./borders",
	"./Border",
	"./BorderColor",
	"./BorderImage",
	"./BorderImageOutset",
	"./BorderImageRepeat",
	"./BorderImageSlice",
	"./BorderRadius",
	"./BorderStyle",
	"./BorderStyleType",
	"./BorderWidth"
],function(borders){
	return borders;
});
define('skylark-graphics-borders', ['skylark-graphics-borders/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-graphics-borders.js.map
