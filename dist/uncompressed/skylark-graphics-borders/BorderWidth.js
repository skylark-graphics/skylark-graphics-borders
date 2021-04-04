define([
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

    langx.mixin(BorderWidth, {
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
