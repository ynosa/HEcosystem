//.CommonJS
var CSSOM={CSSRule:require("./CSSRule").CSSRule,MediaList:require("./MediaList").MediaList};CSSOM.CSSMediaRule=function(){CSSOM.CSSRule.call(this),this.media=new CSSOM.MediaList,this.cssRules=[]},CSSOM.CSSMediaRule.prototype=new CSSOM.CSSRule,CSSOM.CSSMediaRule.prototype.constructor=CSSOM.CSSMediaRule,CSSOM.CSSMediaRule.prototype.type=4,CSSOM.CSSMediaRule.prototype.__defineGetter__("cssText",function(){for(var e=[],t=0,n=this.cssRules.length;n>t;t++)e.push(this.cssRules[t].cssText);return"@media "+this.media.mediaText+" {"+e.join("")+"}"}),exports.CSSMediaRule=CSSOM.CSSMediaRule;
//# sourceMappingURL=jspm_packages/npm/cssom@0.2.5/CSSMediaRule.js.map