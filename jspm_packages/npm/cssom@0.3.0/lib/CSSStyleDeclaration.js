//.CommonJS
var CSSOM={};CSSOM.CSSStyleDeclaration=function(){this.length=0,this.parentRule=null,this._importants={}},CSSOM.CSSStyleDeclaration.prototype={constructor:CSSOM.CSSStyleDeclaration,getPropertyValue:function(e){return this[e]||""},setProperty:function(e,t,r){if(this[e]){var n=Array.prototype.indexOf.call(this,e);0>n&&(this[this.length]=e,this.length++)}else this[this.length]=e,this.length++;this[e]=t,this._importants[e]=r},removeProperty:function(e){if(!(e in this))return"";var t=Array.prototype.indexOf.call(this,e);if(0>t)return"";var r=this[e];return this[e]="",Array.prototype.splice.call(this,t,1),r},getPropertyCSSValue:function(){},getPropertyPriority:function(e){return this._importants[e]||""},getPropertyShorthand:function(){},isPropertyImplicit:function(){},get cssText(){for(var e=[],t=0,r=this.length;r>t;++t){var n=this[t],i=this.getPropertyValue(n),o=this.getPropertyPriority(n);o&&(o=" !"+o),e[t]=n+": "+i+o+";"}return e.join(" ")},set cssText(e){var t,r;for(t=this.length;t--;)r=this[t],this[r]="";Array.prototype.splice.call(this,0,this.length),this._importants={};var n=CSSOM.parse("#bogus{"+e+"}").cssRules[0].style,i=n.length;for(t=0;i>t;++t)r=n[t],this.setProperty(n[t],n.getPropertyValue(r),n.getPropertyPriority(r))}},exports.CSSStyleDeclaration=CSSOM.CSSStyleDeclaration,CSSOM.parse=require("./parse").parse;
//# sourceMappingURL=jspm_packages\npm\cssom@0.3.0/lib\CSSStyleDeclaration.js.map