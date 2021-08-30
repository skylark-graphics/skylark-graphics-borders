define([
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

    langx.mixin(BorderRadius, {
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
