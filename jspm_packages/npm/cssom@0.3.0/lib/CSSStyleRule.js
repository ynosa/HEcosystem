//.CommonJS
var CSSOM={CSSStyleDeclaration:require("./CSSStyleDeclaration").CSSStyleDeclaration,CSSRule:require("./CSSRule").CSSRule};CSSOM.CSSStyleRule=function(){CSSOM.CSSRule.call(this),this.selectorText="",this.style=new CSSOM.CSSStyleDeclaration,this.style.parentRule=this},CSSOM.CSSStyleRule.prototype=new CSSOM.CSSRule,CSSOM.CSSStyleRule.prototype.constructor=CSSOM.CSSStyleRule,CSSOM.CSSStyleRule.prototype.type=1,Object.defineProperty(CSSOM.CSSStyleRule.prototype,"cssText",{get:function(){var e;return e=this.selectorText?this.selectorText+" {"+this.style.cssText+"}":""},set:function(e){var t=CSSOM.CSSStyleRule.parse(e);this.style=t.style,this.selectorText=t.selectorText}}),CSSOM.CSSStyleRule.parse=function(e){for(var t,r,n,i=0,o="selector",s=i,a="",u={selector:!0,value:!0},l=new CSSOM.CSSStyleRule,f="";n=e.charAt(i);i++)switch(n){case" ":case"	":case"\r":case"\n":case"\f":if(u[o])switch(e.charAt(i-1)){case" ":case"	":case"\r":case"\n":case"\f":break;default:a+=" "}break;case'"':if(s=i+1,t=e.indexOf('"',s)+1,!t)throw'" is missing';a+=e.slice(i,t),i=t-1;break;case"'":if(s=i+1,t=e.indexOf("'",s)+1,!t)throw"' is missing";a+=e.slice(i,t),i=t-1;break;case"/":if("*"===e.charAt(i+1)){if(i+=2,t=e.indexOf("*/",i),-1===t)throw new SyntaxError("Missing */");i=t+1}else a+=n;break;case"{":"selector"===o&&(l.selectorText=a.trim(),a="",o="name");break;case":":"name"===o?(r=a.trim(),a="",o="value"):a+=n;break;case"!":"value"===o&&e.indexOf("!important",i)===i?(f="important",i+="important".length):a+=n;break;case";":"value"===o?(l.style.setProperty(r,a.trim(),f),f="",a="",o="name"):a+=n;break;case"}":if("value"===o)l.style.setProperty(r,a.trim(),f),f="",a="";else{if("name"===o)break;a+=n}o="selector";break;default:a+=n}return l},exports.CSSStyleRule=CSSOM.CSSStyleRule;
//# sourceMappingURL=jspm_packages\npm\cssom@0.3.0/lib\CSSStyleRule.js.map