//.CommonJS
var CSSOM={CSSRule:require("./CSSRule").CSSRule,MediaList:require("./MediaList").MediaList};CSSOM.CSSMediaRule=function(){CSSOM.CSSRule.call(this),this.media=new CSSOM.MediaList,this.cssRules=[]},CSSOM.CSSMediaRule.prototype=new CSSOM.CSSRule,CSSOM.CSSMediaRule.prototype.constructor=CSSOM.CSSMediaRule,CSSOM.CSSMediaRule.prototype.type=4,Object.defineProperty(CSSOM.CSSMediaRule.prototype,"cssText",{get:function(){for(var e=[],t=0,r=this.cssRules.length;r>t;t++)e.push(this.cssRules[t].cssText);return"@media "+this.media.mediaText+" {"+e.join("")+"}"}}),exports.CSSMediaRule=CSSOM.CSSMediaRule;
//# sourceMappingURL=jspm_packages\npm\cssom@0.3.0/lib\CSSMediaRule.js.map