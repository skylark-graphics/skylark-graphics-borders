/**
 * skylark-graphics-borders - The skylark border class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-graphics-colors/Color","./borders"],function(t,o,r){var i=/\d*\D*\s*/g,n=t.klass({klassName:"BorderColor",left:{type:o,alias:"l",get:function(){return this._.left},set:function(t){this._.left=t}},top:{type:o,alias:"t",get:function(){return this._.top},set:function(t){this._.top=t}},right:{type:o,alias:"r",get:function(){return this._.right},set:function(t){this._.right=t}},bottom:{type:o,alias:"b",get:function(){return this._.bottom},set:function(t){this._.bottom=t}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._setupAttributeValues({left:t,right:t,top:t,bottom:t})},clone:function(){var t=this._;return new n(t.top,t.right,t.left,t.bottom)},equal:function(t){return!this.notEqual(t)},notEqual:function(t){return!!t&&this.toString()!=t.toString()},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{t:this.top,r:this.right,l:this.left,b:this.bottom}},toString:function(){var t=this.left.toString(),o=this.top.toString(),r=this.right.toString(),i=this.bottom.toString();return r==t?o==i?o==r?o.toString():o+" "+r:o+" "+r+" "+i:o+" "+r+" "+t+" "+i},_construct:function(t,o,r,i){void 0===i&&(void 0!==r?(i=r,r=o):void 0!==o?(i=t,r=o):i=r=o=void 0!==t?t:t=0),this._={left:r,right:o,top:t,bottom:i}}});return t.mixin(n,{fromArray:function(t){switch(t.length){case 1:return new n(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new n(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new n(t.t,t.r,t.l,t.b)},fromString:function(t){var o,r,e,s,l=t.match(i);switch(l.length){case 1:o=r=e=s=l[0];break;case 2:o=s=l[0],r=e=l[1];break;case 3:o=l[0],r=e=l[1],s=l[2];break;case 4:o=l[0],r=l[1],e=l[2],s=l[3]}return new n(o,r,e,s)}}),n.fromCss=function(t){return void 0!==t.borderTopColor&&void 0!==t.borderRightColor&&void 0!==t.borderLeftColor&&void 0!==t.borderBottomColor?new n(t.borderTopColor,t.borderRightColor,t.borderLeftColor,t.borderBottomColor):null},n.toCss=function(t,o){return o||(o={}),t&&(o.borderTopColor=t.top.toString(),o.borderRightColor=t.right.toString(),o.borderLeftColor=t.left.toString(),o.borderBottomColor=t.bottom.toString()),o},r.BorderColor=n});
//# sourceMappingURL=sourcemaps/BorderColor.js.map
