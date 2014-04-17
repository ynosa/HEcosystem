//.CommonJS
var CSSOM={};CSSOM.parse=function(e){for(var t,r,n,i,o,s,a,u,l,f,c=0,h="before-selector",p="",d={selector:!0,value:!0,atRule:!0,"importRule-begin":!0,importRule:!0,atBlock:!0,"documentRule-begin":!0},g=new CSSOM.CSSStyleSheet,m=g,y="",b=/@(-(?:\w+-)+)?keyframes/g,v=function(t){var r=e.substring(0,c).split("\n"),n=r.length,i=r.pop().length+1,o=new Error(t+" (line "+n+", char "+i+")");throw o.line=n,o.char=i,o.styleSheet=g,o};f=e.charAt(c);c++)switch(f){case" ":case"	":case"\r":case"\n":case"\f":d[h]&&(p+=f);break;case'"':t=c+1;do t=e.indexOf('"',t)+1,t||v('Unmatched "');while("\\"===e[t-2]);switch(p+=e.slice(c,t),c=t-1,h){case"before-value":h="value";break;case"importRule-begin":h="importRule"}break;case"'":t=c+1;do t=e.indexOf("'",t)+1,t||v("Unmatched '");while("\\"===e[t-2]);switch(p+=e.slice(c,t),c=t-1,h){case"before-value":h="value";break;case"importRule-begin":h="importRule"}break;case"/":"*"===e.charAt(c+1)?(c+=2,t=e.indexOf("*/",c),-1===t?v("Missing */"):c=t+1):p+=f,"importRule-begin"===h&&(p+=" ",h="importRule");break;case"@":if(e.indexOf("@-moz-document",c)===c){h="documentRule-begin",l=new CSSOM.CSSDocumentRule,l.__starts=c,c+="-moz-document".length,p="";break}if(e.indexOf("@media",c)===c){h="atBlock",o=new CSSOM.CSSMediaRule,o.__starts=c,c+="media".length,p="";break}if(e.indexOf("@import",c)===c){h="importRule-begin",c+="import".length,p+="@import";break}if(e.indexOf("@font-face",c)===c){h="fontFaceRule-begin",c+="font-face".length,a=new CSSOM.CSSFontFaceRule,a.__starts=c,p="";break}b.lastIndex=c;var w=b.exec(e);if(w&&w.index===c){h="keyframesRule-begin",u=new CSSOM.CSSKeyframesRule,u.__starts=c,u._vendorPrefix=w[1],c+=w[0].length-1,p="";break}"selector"==h&&(h="atRule"),p+=f;break;case"{":"selector"===h||"atRule"===h?(i.selectorText=p.trim(),i.style.__starts=c,p="",h="before-name"):"atBlock"===h?(o.media.mediaText=p.trim(),m=r=o,o.parentStyleSheet=g,p="",h="before-selector"):"fontFaceRule-begin"===h?(r&&(a.parentRule=r),a.parentStyleSheet=g,i=a,p="",h="before-name"):"keyframesRule-begin"===h?(u.name=p.trim(),r&&(u.parentRule=r),u.parentStyleSheet=g,m=r=u,p="",h="keyframeRule-begin"):"keyframeRule-begin"===h?(i=new CSSOM.CSSKeyframeRule,i.keyText=p.trim(),i.__starts=c,p="",h="before-name"):"documentRule-begin"===h&&(l.matcher.matcherText=p.trim(),r&&(l.parentRule=r),m=r=l,l.parentStyleSheet=g,p="",h="before-selector");break;case":":"name"===h?(n=p.trim(),p="",h="before-value"):p+=f;break;case"(":if("value"===h)if("expression"==p.trim()){var S=new CSSOM.CSSValueExpression(e,c).parse();S.error?v(S.error):(p+=S.expression,c=S.idx)}else t=e.indexOf(")",c+1),-1===t&&v('Unmatched "("'),p+=e.slice(c,t+1),c=t;else p+=f;break;case"!":"value"===h&&e.indexOf("!important",c)===c?(y="important",c+="important".length):p+=f;break;case";":switch(h){case"value":i.style.setProperty(n,p.trim(),y),y="",p="",h="before-name";break;case"atRule":p="",h="before-selector";break;case"importRule":s=new CSSOM.CSSImportRule,s.parentStyleSheet=s.styleSheet.parentStyleSheet=g,s.cssText=p+f,g.cssRules.push(s),p="",h="before-selector";break;default:p+=f}break;case"}":switch(h){case"value":i.style.setProperty(n,p.trim(),y),y="";case"before-name":case"name":i.__ends=c+1,r&&(i.parentRule=r),i.parentStyleSheet=g,m.cssRules.push(i),p="",h=m.constructor===CSSOM.CSSKeyframesRule?"keyframeRule-begin":"before-selector";break;case"keyframeRule-begin":case"before-selector":case"selector":r||v("Unexpected }"),m.__ends=c+1,g.cssRules.push(m),m=g,r=null,p="",h="before-selector"}break;default:switch(h){case"before-selector":h="selector",i=new CSSOM.CSSStyleRule,i.__starts=c;break;case"before-name":h="name";break;case"before-value":h="value";break;case"importRule-begin":h="importRule"}p+=f}return g},exports.parse=CSSOM.parse,CSSOM.CSSStyleSheet=require("./CSSStyleSheet").CSSStyleSheet,CSSOM.CSSStyleRule=require("./CSSStyleRule").CSSStyleRule,CSSOM.CSSImportRule=require("./CSSImportRule").CSSImportRule,CSSOM.CSSMediaRule=require("./CSSMediaRule").CSSMediaRule,CSSOM.CSSFontFaceRule=require("./CSSFontFaceRule").CSSFontFaceRule,CSSOM.CSSStyleDeclaration=require("./CSSStyleDeclaration").CSSStyleDeclaration,CSSOM.CSSKeyframeRule=require("./CSSKeyframeRule").CSSKeyframeRule,CSSOM.CSSKeyframesRule=require("./CSSKeyframesRule").CSSKeyframesRule,CSSOM.CSSValueExpression=require("./CSSValueExpression").CSSValueExpression,CSSOM.CSSDocumentRule=require("./CSSDocumentRule").CSSDocumentRule;
//# sourceMappingURL=jspm_packages\npm\cssom@0.3.0/lib\parse.js.map