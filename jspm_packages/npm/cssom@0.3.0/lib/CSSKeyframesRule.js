//.CommonJS
var CSSOM={CSSRule:require("./CSSRule").CSSRule};CSSOM.CSSKeyframesRule=function(){CSSOM.CSSRule.call(this),this.name="",this.cssRules=[]},CSSOM.CSSKeyframesRule.prototype=new CSSOM.CSSRule,CSSOM.CSSKeyframesRule.prototype.constructor=CSSOM.CSSKeyframesRule,CSSOM.CSSKeyframesRule.prototype.type=8,Object.defineProperty(CSSOM.CSSKeyframesRule.prototype,"cssText",{get:function(){for(var e=[],t=0,r=this.cssRules.length;r>t;t++)e.push("  "+this.cssRules[t].cssText);return"@"+(this._vendorPrefix||"")+"keyframes "+this.name+" { \n"+e.join("\n")+"\n}"}}),exports.CSSKeyframesRule=CSSOM.CSSKeyframesRule;
//# sourceMappingURL=jspm_packages\npm\cssom@0.3.0/lib\CSSKeyframesRule.js.map