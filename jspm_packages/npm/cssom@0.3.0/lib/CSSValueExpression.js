//.CommonJS
var CSSOM={CSSValue:require("./CSSValue").CSSValue};CSSOM.CSSValueExpression=function(e,t){this._token=e,this._idx=t},CSSOM.CSSValueExpression.prototype=new CSSOM.CSSValue,CSSOM.CSSValueExpression.prototype.constructor=CSSOM.CSSValueExpression,CSSOM.CSSValueExpression.prototype.parse=function(){for(var e,t=this._token,r=this._idx,n="",i="",o="",s=[];;++r){if(n=t.charAt(r),""==n){o="css expression error: unfinished expression!";break}switch(n){case"(":s.push(n),i+=n;break;case")":s.pop(n),i+=n;break;case"/":(e=this._parseJSComment(t,r))?e.error?o="css expression error: unfinished comment in expression!":r=e.idx:(e=this._parseJSRexExp(t,r))?(r=e.idx,i+=e.text):i+=n;break;case"'":case'"':e=this._parseJSString(t,r,n),e?(r=e.idx,i+=e.text):i+=n;break;default:i+=n}if(o)break;if(0==s.length)break}var a;return a=o?{error:o}:{idx:r,expression:i}},CSSOM.CSSValueExpression.prototype._parseJSComment=function(e,t){var r,n=e.charAt(t+1);if("/"==n||"*"==n){var i,o,s=t;return"/"==n?o="\n":"*"==n&&(o="*/"),i=e.indexOf(o,s+1+1),-1!==i?(i=i+o.length-1,r=e.substring(t,i+1),{idx:i,text:r}):(error="css expression error: unfinished comment in expression!",{error:error})}return!1},CSSOM.CSSValueExpression.prototype._parseJSString=function(e,t,r){var n,i=this._findMatchedIdx(e,t,r);return-1===i?!1:(n=e.substring(t,i+r.length),{idx:i,text:n})},CSSOM.CSSValueExpression.prototype._parseJSRexExp=function(e,t){var r=e.substring(0,t).replace(/\s+$/,""),n=[/^$/,/\($/,/\[$/,/\!$/,/\+$/,/\-$/,/\*$/,/\/\s+/,/\%$/,/\=$/,/\>$/,/\<$/,/\&$/,/\|$/,/\^$/,/\~$/,/\?$/,/\,$/,/delete$/,/in$/,/instanceof$/,/new$/,/typeof$/,/void$/],i=n.some(function(e){return e.test(r)});if(i){var o="/";return this._parseJSString(e,t,o)}return!1},CSSOM.CSSValueExpression.prototype._findMatchedIdx=function(e,t,r){for(var n,i=t,o=-1;;){if(n=e.indexOf(r,i+1),-1===n){n=o;break}var s=e.substring(t+1,n),a=s.match(/\\+$/);if(!a||a[0]%2==0)break;i=n}var u=e.indexOf("\n",t+1);return n>u&&(n=o),n},exports.CSSValueExpression=CSSOM.CSSValueExpression;
//# sourceMappingURL=jspm_packages\npm\cssom@0.3.0/lib\CSSValueExpression.js.map