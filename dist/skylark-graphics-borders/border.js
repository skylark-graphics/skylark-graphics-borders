/**
 * skylark-graphics-borders - The skylark border class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./borders","./border-color","./border-image","./border-radius","./border-style","./border-width"],function(t,s,r,o,i,e,n){var u=t.klass({color:{type:r,get:function(){return this._.color},set:function(t){this._.color=t}},image:{type:o,get:function(){return this._.image},set:function(t){this._.image=t}},radius:{type:i,get:function(){return this._.radius},set:function(t){this._.radius=t}},style:{type:e,get:function(){return this._.style},set:function(t){this._.style=t}},width:{type:n,get:function(){return this._.width},set:function(t){this._.width=t}},toCss:function(t){return u.toCss(this,t)},_construct:function(t){this._={color:t.color,image:t.image,radius:t.radius,style:t.style,width:t.width}}});return u.fromCss=function(t){return new u({color:r.fromCss(t),image:o.fromCss(t),radius:i.fromCss(t),style:e.fromCss(t),width:n.fromCss(t)})},u.toCss=function(t,s){return s||(s={}),r.toCss(t.color,s),o.toCss(t.image,s),i.toCss(t.radius,s),e.toCss(t.color,s),n.toCss(t.color,s),s},s.Border=u});
//# sourceMappingURL=sourcemaps/border.js.map
