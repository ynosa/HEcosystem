//.CommonJS
var CSSOM={StyleSheet:require("./StyleSheet").StyleSheet,CSSStyleRule:require("./CSSStyleRule").CSSStyleRule};CSSOM.CSSStyleSheet=function(){CSSOM.StyleSheet.call(this),this.cssRules=[]},CSSOM.CSSStyleSheet.prototype=new CSSOM.StyleSheet,CSSOM.CSSStyleSheet.prototype.constructor=CSSOM.CSSStyleSheet,CSSOM.CSSStyleSheet.prototype.insertRule=function(e,t){if(0>t||t>this.cssRules.length)throw new RangeError("INDEX_SIZE_ERR");var r=CSSOM.parse(e).cssRules[0];return r.parentStyleSheet=this,this.cssRules.splice(t,0,r),t},CSSOM.CSSStyleSheet.prototype.deleteRule=function(e){if(0>e||e>=this.cssRules.length)throw new RangeError("INDEX_SIZE_ERR");this.cssRules.splice(e,1)},CSSOM.CSSStyleSheet.prototype.toString=function(){for(var e="",t=this.cssRules,r=0;r<t.length;r++)e+=t[r].cssText+"\n";return e},exports.CSSStyleSheet=CSSOM.CSSStyleSheet,CSSOM.parse=require("./parse").parse;
//# sourceMappingURL=jspm_packages\npm\cssom@0.3.0/lib\CSSStyleSheet.js.map