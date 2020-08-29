define([
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
