/**
 * skylark-graphics-borders - The skylark border class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./borders","./border-style-type"],function(t,r,o){var e=/\d*\D*\s*/g,i=t.klass({klassName:"BorderStyle",left:{alias:"l",get:function(){return this._.left},set:function(t){this._.left=t}},top:{alias:"t",get:function(){return this._.top},set:function(t){this._.top=t}},right:{alias:"r",get:function(){return this._.right},set:function(t){this._.right=t}},bottom:{alias:"b",get:function(){return this._.bottom},set:function(t){this._.bottom=t}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._={left:t,right:t,top:t,bottom:t}},clone:function(){var t=this._;return new i(t.top,t.right,t.left,t.bottom)},equal:function(t){return!this.notEqual(t)},notEqual:function(t){return!!t&&this.toString()!=t.toString()},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{t:this.top,r:this.right,l:this.left,b:this.bottom}},toString:function(){var t=o[this.left],r=o[this.top],e=o[this.right],i=o[this.bottom];return e==t?r==i?r==e?r.toString():r+" "+e:r+" "+e+" "+i:r+" "+e+" "+t+" "+i},_construct:function(t,r,o,e){void 0===e&&(void 0!==o?(e=o,o=r):void 0!==r?(e=t,o=r):e=o=r=void 0!==t?t:t=0),this._={left:o,right:r,top:t,bottom:e}}});return Object.mixin(i,{fromArray:function(t){switch(t.length){case 1:return new i(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new i(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new i(t.t,t.r,t.l,t.b)},fromString:function(t){var r,o,n,s,l=t.match(e);switch(l?l.length:0){case 1:r=o=n=s=l[0];break;case 2:r=s=l[0],o=n=l[1];break;case 3:r=l[0],o=n=l[1],s=l[2];break;case 4:r=l[0],o=l[1],n=l[2],s=l[3]}return new i(r,o,n,s)}}),i.fromCss=function(t){return void 0!=t.borderTopStyle&&void 0!=t.borderRightStyle&&void 0!=t.borderLeftStyle&&void 0!=t.borderBottomStyle?new i(o[t.borderTopStyle],o[t.borderRightStyle],o[t.borderLeftStyle],o[t.borderBottomStyle]):null},i.toCss=function(t,r){return r||(r={}),t&&(r.borderTopStyle=o[t.top],r.borderRightStyle=o[t.right],r.borderLeftStyle=o[t.left],r.borderBottomStyle=o[t.bottom]),r},r.BorderStyle=i});
//# sourceMappingURL=sourcemaps/border-style.js.map
