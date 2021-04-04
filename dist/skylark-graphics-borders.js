/**
 * skylark-graphics-borders - The skylark border class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(t,r){var o=r.define,require=r.require,e="function"==typeof o&&o.amd,i=!e&&"undefined"!=typeof exports;if(!e&&!o){var n={};o=r.define=function(t,r,o){"function"==typeof o?(n[t]={factory:o,deps:r.map(function(r){return function(t,r){if("."!==t[0])return t;var o=r.split("/"),e=t.split("/");o.pop();for(var i=0;i<e.length;i++)"."!=e[i]&&(".."==e[i]?o.pop():o.push(e[i]));return o.join("/")}(r,t)}),resolved:!1,exports:null},require(t)):n[t]={factory:null,resolved:!0,exports:o}},require=r.require=function(t){if(!n.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=n[t];if(!module.resolved){var o=[];module.deps.forEach(function(t){o.push(require(t))}),module.exports=module.factory.apply(r,o)||null,module.resolved=!0}return module.exports}}if(!o)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,require){t("skylark-graphics-borders/borders",["skylark-langx/skylark"],function(t){return t.attach("graphics.borders",{})}),t("skylark-graphics-borders/BorderColor",["skylark-langx/langx","skylark-graphics-colors/Color","./borders"],function(t,r,o){var e=/\d*\D*\s*/g,i=t.klass({klassName:"BorderColor",left:{type:r,alias:"l",get:function(){return this._.left},set:function(t){this._.left=t}},top:{type:r,alias:"t",get:function(){return this._.top},set:function(t){this._.top=t}},right:{type:r,alias:"r",get:function(){return this._.right},set:function(t){this._.right=t}},bottom:{type:r,alias:"b",get:function(){return this._.bottom},set:function(t){this._.bottom=t}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._setupAttributeValues({left:t,right:t,top:t,bottom:t})},clone:function(){var t=this._;return new i(t.top,t.right,t.left,t.bottom)},equal:function(t){return!this.notEqual(t)},notEqual:function(t){if(!t)return!1;var r=this.toString(),o=t.toString();return r!=o},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{t:this.top,r:this.right,l:this.left,b:this.bottom}},toString:function(){var t=this.left.toString(),r=this.top.toString(),o=this.right.toString(),e=this.bottom.toString();return o==t?r==e?r==o?r.toString():r+" "+o:r+" "+o+" "+e:r+" "+o+" "+t+" "+e},_construct:function(t,r,o,e){void 0===e&&(void 0!==o?(e=o,o=r):void 0!==r?(e=t,o=r):e=o=r=void 0!==t?t:t=0),this._={left:o,right:r,top:t,bottom:e}}});return t.mixin(i,{fromArray:function(t){switch(t.length){case 1:return new i(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new i(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new i(t.t,t.r,t.l,t.b)},fromString:function(t){var r,o,n,s,u=t.match(e),h=u.length;switch(h){case 1:r=o=n=s=u[0];break;case 2:r=s=u[0],o=n=u[1];break;case 3:r=u[0],o=n=u[1],s=u[2];break;case 4:r=u[0],o=u[1],n=u[2],s=u[3]}return new i(r,o,n,s)}}),i.fromCss=function(t){return void 0!==t.borderTopColor&&void 0!==t.borderRightColor&&void 0!==t.borderLeftColor&&void 0!==t.borderBottomColor?new i(t.borderTopColor,t.borderRightColor,t.borderLeftColor,t.borderBottomColor):null},i.toCss=function(t,r){return r||(r={}),t&&(r.borderTopColor=t.top.toString(),r.borderRightColor=t.right.toString(),r.borderLeftColor=t.left.toString(),r.borderBottomColor=t.bottom.toString()),r},o.BorderColor=i}),t("skylark-graphics-borders/BorderImageOutset",["skylark-langx/langx","./borders"],function(t,r){var o=/\d+\s*/g,e=t.klass({klassName:"BorderImageOutset",left:{type:Number,alias:"l",get:function(){return this._.left},set:function(t){this._.left=t}},top:{type:Number,alias:"t",get:function(){return this._.top},set:function(t){this._.top=t}},right:{type:Number,alias:"r",get:function(){return this._.right},set:function(t){this._.right=t}},bottom:{type:Number,alias:"b",get:function(){return this._.bottom},set:function(t){this._.bottom=t}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._setupAttributeValues({left:t,right:t,top:t,bottom:t})},clone:function(){var t=this._;return new e(t.top,t.right,t.left,t.bottom)},equale:function(t){return!this.notEqual(t)},notEqual:function(t){return!t||this.left!=t.left||this.top!=t.top||this.right!=t.right||this.bottom!=t.bottom},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{t:this.top,r:this.right,l:this.left,b:this.bottom}},toString:function(){var t=this.left.toString(),r=this.top.toString(),o=this.right.toString(),e=this.bottom.toString();return o==t?r==e?r==o?r.toString():r+" "+o:r+" "+o+" "+e:r+" "+o+" "+t+" "+e},_construct:function(t,r,o,e){void 0===e&&(void 0!==o?(e=o,o=r):void 0!==r?(e=t,o=r):e=o=r=void 0!==t?t:t=0),this._={left:o,right:r,top:t,bottom:e}}});return t.mixin(e,{fromArray:function(t){switch(t.length){case 1:return new e(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new e(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new e(t.t,t.r,t.l,t.b)},fromString:function(t){var r,i,n,s,u=t.match(o),h=u?u.length:0;switch(h){case 1:r=i=n=s=u[0];break;case 2:r=s=u[0],i=n=u[1];break;case 3:r=u[0],i=n=u[1],s=u[2];break;case 4:r=u[0],i=u[1],n=u[2],s=u[3];break;default:r=i=n=s=null}return new e(r,i,n,s)},Zero:new e(0)}),e.fromCss=function(t){return t.borderImageOutset?e.fromString(t.borderImageOutset):null},e.toCss=function(t,r){return r||(r={}),t&&(r.borderImageOutset=t.toString()),r},r.BorderImageOutset=e}),t("skylark-graphics-borders/BorderImageRepeat",["skylark-langx/langx","./borders"],function(t,r){var o=["repeat","round","stretch"];return t.mixin(o,{repeat:0,round:1,stretch:2}),r.BorderImageRepeat=o}),t("skylark-graphics-borders/BorderImageSlice",["skylark-langx/langx","./borders"],function(t,r){var o=/\d+\D*\s*/g,e=t.klass({klassName:"BorderImageSlice",left:{type:Number,alias:"l",get:function(){return this._.left},set:function(t){this._.left=t}},top:{type:Number,alias:"t",get:function(){return this._.top},set:function(t){this._.top=t}},right:{type:Number,alias:"r",get:function(){return this._.right},set:function(t){this._.right=t}},bottom:{type:Number,alias:"b",get:function(){return this._.bottom},set:function(t){this._.bottom=t}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._setupAttributeValues({left:t,right:t,top:t,bottom:t})},clone:function(){var t=this._;return new e(t.top,t.right,t.left,t.bottom)},equale:function(t){return!this.notEqual(t)},notEqual:function(t){return!t||this.left!=t.left||this.top!=t.top||this.right!=t.right||this.bottom!=t.bottom},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{t:this.top,r:this.right,l:this.left,b:this.bottom}},toString:function(){var t=this.left<0?"fill":this.left.toString(),r=this.top<0?"fill":this.top.toString(),o=this.right<0?"fill":this.right.toString(),e=this.bottom<0?"fill":this.bottom.toString();return o==t?r==e?r==o?r.toString():r+" "+o:r+" "+o+" "+e:r+" "+o+" "+t+" "+e},_construct:function(t,r,o,e){void 0===e&&(void 0!==o?(e=o,o=r):void 0!==r?(e=t,o=r):e=o=r=void 0!==t?t:t=0),this._={left:o,right:r,top:t,bottom:e}}});return t.mixin(e,{fromArray:function(t){switch(t.length){case 1:return new e(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new e(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new e(t.t,t.r,t.l,t.b)},fromString:function(t){var r,i,n,s,u=t.match(o),h=u?u.length:0;switch(h){case 1:r=i=n=s=u[0];break;case 2:r=s=u[0],i=n=u[1];break;case 3:r=u[0],i=n=u[1],s=u[2];break;case 4:r=u[0],i=u[1],n=u[2],s=u[3];break;default:r=i=n=s=null}return"fill"==r&&(r=-1),"fill"==i&&(i=-1),"fill"==n&&(n=-1),"fill"==s&&(s=-1),new e(r,i,n,s)},Zero:new e(0)}),e.fromCss=function(t){return void 0!=t.borderImageSlice?e.fromString(t.borderImageSlice):null},e.toCss=function(t,r){return r||(r={}),t&&(r.borderImageSlice=t.toString()),r},r.BorderImageSlice=e}),t("skylark-graphics-borders/BorderImage",["skylark-langx/langx","skylark-graphics-brushes/ImageBrush","./borders","./BorderImageOutset","./BorderImageRepeat","./BorderImageSlice"],function(t,r,o,e,i,n){var s=t.klass({klassName:"BorderImage",outset:{type:i,get:function(){return this._.outset},set:function(t){this._.outset=t}},repeat:{type:n,get:function(){return this._.repeat},set:function(t){this._.repeat=t}},slice:{type:r,get:function(){return this._.slice},set:function(t){this._.slice=t}},source:{type:e,get:function(){return this._.source},set:function(t){this._.source=t}},width:{get:function(){return this._.width},set:function(t){this._.width=t}},_construct:function(t){this._={outset:t.outset,repeat:t.repeat,slice:t.slice,source:t.source,width:t.width}}});return s.fromPlain=function(t){return new s({outset:t.outset,repeat:t.repeat,slice:t.slice,source:t.source,width:t.width})},s.fromCss=function(t){return s.fromPlain({outset:t.borderImageOutset,repeat:t.borderImageRepeat,slice:t.borderImageSlice,source:t.borderImageSource,width:t.borderImageWidth})},s.toCss=function(t,r){return r||(r={}),t&&t.outset&&(r.borderImageOutset=t.outset.toString()),t&&t.repeat&&(r.borderImageRepeat=n[t.repeat]),t&&t.slice&&(r.borderImageSlice=t.slice.toString()),t&&t.source&&(r.borderImageSource=t.source.toString()),t&&t.width&&(r.borderImageWidth=t.width.toString()),r},o.BorderImage=s}),t("skylark-graphics-borders/BorderRadius",["skylark-langx/langx","./borders"],function(t,r){var o=/\d+\D*\s*/g,e=t.klass({klassName:"BorderRadius",topLeft:{alias:"tl",get:function(){return this._.topLeft},set:function(t){this._.topLeft=t}},topRight:{alias:"tr",get:function(){return this._.topRight},set:function(t){this._.topRight=t}},bottomRight:{alias:"br",get:function(){return this._.bottomRight},set:function(t){this._.bottomRight=t}},bottomLeft:{alias:"bl",get:function(){return this._.bottomLeft},set:function(t){this._.bottomLeft=t}},getAll:function(){return this.topLeft==this.topRight&&this.topLeft==this.bottomRight&&this.topLeft==this.bottomLeft?this.topLeft:null},setAll:function(t){this._setupAttributeValues({topLeft:t,topRight:t,bottomRight:t,bottomLeft:t})},clone:function(){var t=this._;return new e(t.topLeft,t.topRight,t.bottomRight,t.bottomLeft)},equal:function(t){return!this.notEqual(t)},notEqual:function(t){if(!t)return!1;var r=this.toString(),o=t.toString();return r!=o},toArray:function(){return[this.topLeft,this.topRight,this.bottomRight,this.bottomLeft]},toPlain:function(){return{topLeft:this.topLeft,topRight:this.topRight,bottomRight:this.bottomRight,bottomLeft:this.bottomLeft}},toString:function(){var t=this.topLeft.toString(),r=this.topRight.toString(),o=this.bottomRight.toString(),e=this.bottomLeft.toString();return o==t?r==e?r==o?r.toString():r+" "+o:r+" "+o+" "+e:r+" "+o+" "+t+" "+e},_construct:function(t,r,o,e){void 0===e&&(void 0!==o?(e=o,o=r):void 0!==r?(e=t,o=r):e=o=r=void 0!==t?t:t=0),this._={topLeft:o,topRight:r,bottomLeft:t,bottomRight:e}}});return t.mixin(e,{fromArray:function(t){switch(t.length){case 1:return new e(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new e(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new e(t.topLeft,t.topRight,t.bottomRight,t.bottomLeft)},fromString:function(t){var r,i,n,s,u=t.match(o),h=u.length;switch(h){case 1:r=i=n=s=u[0];break;case 2:r=s=u[0],i=n=u[1];break;case 3:r=u[0],i=n=u[1],s=u[2];break;case 4:r=u[0],i=u[1],n=u[2],s=u[3]}return new e(r,i,n,s)}}),e.fromCss=function(t){return void 0!=t.borderTopLeftRadius&&void 0!=t.borderTopRightRadius&&void 0!=t.borderBottomRightRadius&&void 0!=t.borderBottomLeftRadius?new e(t.borderTopLeftRadius,t.borderTopRightRadius,t.borderBottomRightRadius,t.borderBottomLeftRadius):null},e.toCss=function(t,r){return r||(r={}),t&&(r.borderTopLeftRadius=t.topLeft.toString(),r.borderTopRightRadius=t.topRight.toString(),r.borderBottomRightRadius=t.bottomRight.toString(),r.borderBottomLeftRadius=t.bottomLeft.toString()),r},e}),t("skylark-graphics-borders/BorderStyleType",["skylark-langx/langx","./borders"],function(t,r){var o=["none","solid","ridge","groove","inset","outset","double","dotted","dashed"];return t.mixin(o,{none:0,solid:1,ridge:2,groove:3,inset:4,outset:5,double:6,dotted:7,dashed:8}),r.BorderStyleType=o}),t("skylark-graphics-borders/BorderStyle",["skylark-langx/langx","./borders","./BorderStyleType"],function(t,r,o){var e=/\d*\D*\s*/g,i=t.klass({klassName:"BorderStyle",left:{alias:"l",get:function(){return this._.left},set:function(t){this._.left=t}},top:{alias:"t",get:function(){return this._.top},set:function(t){this._.top=t}},right:{alias:"r",get:function(){return this._.right},set:function(t){this._.right=t}},bottom:{alias:"b",get:function(){return this._.bottom},set:function(t){this._.bottom=t}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._={left:t,right:t,top:t,bottom:t}},clone:function(){var t=this._;return new i(t.top,t.right,t.left,t.bottom)},equal:function(t){return!this.notEqual(t)},notEqual:function(t){if(!t)return!1;var r=this.toString(),o=t.toString();return r!=o},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{t:this.top,r:this.right,l:this.left,b:this.bottom}},toString:function(){var t=o[this.left],r=o[this.top],e=o[this.right],i=o[this.bottom];return e==t?r==i?r==e?r.toString():r+" "+e:r+" "+e+" "+i:r+" "+e+" "+t+" "+i},_construct:function(t,r,o,e){void 0===e&&(void 0!==o?(e=o,o=r):void 0!==r?(e=t,o=r):e=o=r=void 0!==t?t:t=0),this._={left:o,right:r,top:t,bottom:e}}});return Object.mixin(i,{fromArray:function(t){switch(t.length){case 1:return new i(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new i(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new i(t.t,t.r,t.l,t.b)},fromString:function(t){var r,o,n,s,u=t.match(e),h=u?u.length:0;switch(h){case 1:r=o=n=s=u[0];break;case 2:r=s=u[0],o=n=u[1];break;case 3:r=u[0],o=n=u[1],s=u[2];break;case 4:r=u[0],o=u[1],n=u[2],s=u[3]}return new i(r,o,n,s)}}),i.fromCss=function(t){return void 0!=t.borderTopStyle&&void 0!=t.borderRightStyle&&void 0!=t.borderLeftStyle&&void 0!=t.borderBottomStyle?new i(o[t.borderTopStyle],o[t.borderRightStyle],o[t.borderLeftStyle],o[t.borderBottomStyle]):null},i.toCss=function(t,r){return r||(r={}),t&&(r.borderTopStyle=o[t.top],r.borderRightStyle=o[t.right],r.borderLeftStyle=o[t.left],r.borderBottomStyle=o[t.bottom]),r},r.BorderStyle=i}),t("skylark-graphics-borders/BorderWidth",["skylark-langx/langx","./borders"],function(t,r){var o=/\d+\D*\s*/g,e=t.klass({klassName:"BorderWidth",left:{alias:"l",get:function(){return this._.left},set:function(t){this._.left=t}},top:{alias:"t",get:function(){return this._.top},set:function(t){this._.top=t}},right:{alias:"r",get:function(){return this._.right},set:function(t){this._.right=t}},bottom:{alias:"b",get:function(){return this._.bottom},set:function(t){this._.bottom=t}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._setupAttributeValues({left:t,right:t,top:t,bottom:t})},clone:function(){var t=this._;return new e(t.top,t.right,t.left,t.bottom)},equal:function(t){return!this.notEqual(t)},notEqual:function(t){if(!t)return!1;var r=this.toString(),o=t.toString();return r!=o},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{t:this.top,r:this.right,l:this.left,b:this.bottom}},toString:function(){var t=this.left.toString(),r=this.top.toString(),o=this.right.toString(),e=this.bottom.toString();return o==t?r==e?r==o?r.toString():r+" "+o:r+" "+o+" "+e:r+" "+o+" "+t+" "+e},_construct:function(t,r,o,e){void 0===e&&(void 0!==o?(e=o,o=r):void 0!==r?(e=t,o=r):e=o=r=void 0!==t?t:t=0),this._={left:o,right:r,top:t,bottom:e}}});return t.mixin(e,{fromArray:function(t){switch(t.length){case 1:return new e(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new e(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new e(t.t,t.r,t.l,t.b)},fromString:function(t){var r,i,n,s,u=t.match(o),h=u?u.length:0;switch(h){case 1:r=i=n=s=u[0];break;case 2:r=s=u[0],i=n=u[1];break;case 3:r=u[0],i=n=u[1],s=u[2];break;case 4:r=u[0],i=u[1],n=u[2],s=u[3];break;default:r=i=n=s=null}return new e(r,i,n,s)},Zero:new e(0)}),e.fromCss=function(t){return new e(t.borderTopWidth,t.borderRightWidth,t.borderLeftWidth,t.borderBottomWidth)},e.toCss=function(t,r){return r||(r={}),t&&(r.borderTopWidth=t.top.toString(),r.borderRightWidth=t.right.toString(),r.borderLeftWidth=t.left.toString(),r.borderBottomWidth=t.bottom.toString()),r},r.BorderWidth=e}),t("skylark-graphics-borders/Border",["skylark-langx/langx","./borders","./BorderColor","./BorderImage","./BorderRadius","./BorderStyle","./BorderWidth"],function(t,r,o,e,i,n,s){var u=t.klass({color:{type:o,get:function(){return this._.color},set:function(t){this._.color=t}},image:{type:e,get:function(){return this._.image},set:function(t){this._.image=t}},radius:{type:i,get:function(){return this._.radius},set:function(t){this._.radius=t}},style:{type:n,get:function(){return this._.style},set:function(t){this._.style=t}},width:{type:s,get:function(){return this._.width},set:function(t){this._.width=t}},toCss:function(t){return u.toCss(this,t)},_construct:function(t){this._={color:t.color,image:t.image,radius:t.radius,style:t.style,width:t.width}}});return u.fromCss=function(t){return new u({color:o.fromCss(t),image:e.fromCss(t),radius:i.fromCss(t),style:n.fromCss(t),width:s.fromCss(t)})},u.toCss=function(t,r){return r||(r={}),o.toCss(t.color,r),e.toCss(t.image,r),i.toCss(t.radius,r),n.toCss(t.color,r),s.toCss(t.color,r),r},r.Border=u}),t("skylark-graphics-borders/main",["./borders","./Border","./BorderColor","./BorderImage","./BorderImageOutset","./BorderImageRepeat","./BorderImageSlice","./BorderRadius","./BorderStyle","./BorderStyleType","./BorderWidth"],function(t){return t}),t("skylark-graphics-borders",["skylark-graphics-borders/main"],function(t){return t})}(o),!e){var s=require("skylark-langx-ns");i?module.exports=s:r.skylarkjs=s}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-graphics-borders.js.map
