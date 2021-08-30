/**
 * skylark-graphics-borders - The skylark border class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-graphics-brushes/image-brush","./borders","./border-image-outset","./border-image-repeat","./border-image-slice"],function(e,t,r,s,i,o){var u=e.klass({klassName:"BorderImage",outset:{type:i,get:function(){return this._.outset},set:function(e){this._.outset=e}},repeat:{type:o,get:function(){return this._.repeat},set:function(e){this._.repeat=e}},slice:{type:t,get:function(){return this._.slice},set:function(e){this._.slice=e}},source:{type:s,get:function(){return this._.source},set:function(e){this._.source=e}},width:{get:function(){return this._.width},set:function(e){this._.width=e}},_construct:function(e){this._={outset:e.outset,repeat:e.repeat,slice:e.slice,source:e.source,width:e.width}}});return u.fromPlain=function(e){return new u({outset:e.outset,repeat:e.repeat,slice:e.slice,source:e.source,width:e.width})},u.fromCss=function(e){return u.fromPlain({outset:e.borderImageOutset,repeat:e.borderImageRepeat,slice:e.borderImageSlice,source:e.borderImageSource,width:e.borderImageWidth})},u.toCss=function(e,t){return t||(t={}),e&&e.outset&&(t.borderImageOutset=e.outset.toString()),e&&e.repeat&&(t.borderImageRepeat=o[e.repeat]),e&&e.slice&&(t.borderImageSlice=e.slice.toString()),e&&e.source&&(t.borderImageSource=e.source.toString()),e&&e.width&&(t.borderImageWidth=e.width.toString()),t},r.BorderImage=u});
//# sourceMappingURL=sourcemaps/border-image.js.map
