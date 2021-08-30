/**
 * skylark-graphics-borders - The skylark border class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./borders"],function(t,i){var r=/\d+\D*\s*/g,e=t.klass({klassName:"BorderImageSlice",left:{type:Number,alias:"l",get:function(){return this._.left},set:function(t){this._.left=t}},top:{type:Number,alias:"t",get:function(){return this._.top},set:function(t){this._.top=t}},right:{type:Number,alias:"r",get:function(){return this._.right},set:function(t){this._.right=t}},bottom:{type:Number,alias:"b",get:function(){return this._.bottom},set:function(t){this._.bottom=t}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._setupAttributeValues({left:t,right:t,top:t,bottom:t})},clone:function(){var t=this._;return new e(t.top,t.right,t.left,t.bottom)},equale:function(t){return!this.notEqual(t)},notEqual:function(t){return!t||this.left!=t.left||this.top!=t.top||this.right!=t.right||this.bottom!=t.bottom},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{t:this.top,r:this.right,l:this.left,b:this.bottom}},toString:function(){var t=this.left<0?"fill":this.left.toString(),i=this.top<0?"fill":this.top.toString(),r=this.right<0?"fill":this.right.toString(),e=this.bottom<0?"fill":this.bottom.toString();return r==t?i==e?i==r?i.toString():i+" "+r:i+" "+r+" "+e:i+" "+r+" "+t+" "+e},_construct:function(t,i,r,e){void 0===e&&(void 0!==r?(e=r,r=i):void 0!==i?(e=t,r=i):e=r=i=void 0!==t?t:t=0),this._={left:r,right:i,top:t,bottom:e}}});return t.mixin(e,{fromArray:function(t){switch(t.length){case 1:return new e(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new e(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new e(t.t,t.r,t.l,t.b)},fromString:function(t){var i,n,o,s,l=t.match(r);switch(l?l.length:0){case 1:i=n=o=s=l[0];break;case 2:i=s=l[0],n=o=l[1];break;case 3:i=l[0],n=o=l[1],s=l[2];break;case 4:i=l[0],n=l[1],o=l[2],s=l[3];break;default:i=n=o=s=null}return"fill"==i&&(i=-1),"fill"==n&&(n=-1),"fill"==o&&(o=-1),"fill"==s&&(s=-1),new e(i,n,o,s)},Zero:new e(0)}),e.fromCss=function(t){return void 0!=t.borderImageSlice?e.fromString(t.borderImageSlice):null},e.toCss=function(t,i){return i||(i={}),t&&(i.borderImageSlice=t.toString()),i},i.BorderImageSlice=e});
//# sourceMappingURL=sourcemaps/border-image-slice.js.map