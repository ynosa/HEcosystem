/*
 * Copyright (C) 2007-2014 Diego Perini
 * All rights reserved.
 *
 * nwmatcher-noqsa.js - A fast CSS selector engine and matcher
 *
 * Author: Diego Perini <diego.perini at gmail com>
 * Version: 1.3.3
 * Created: 20070722
 * Release: 20140330
 *
 * License:
 *  http://javascript.nwbox.com/NWMatcher/MIT-LICENSE
 * Download:
 *  http://javascript.nwbox.com/NWMatcher/nwmatcher.js
 */
!function(e,t){"object"==typeof module&&"object"==typeof exports?(module.exports=function(e){e.console=console,e.parseInt=parseInt,e.Function=Function,e.Boolean=Boolean,e.Number=Number,e.RegExp=RegExp,e.String=String,e.Object=Object,e.Array=Array,e.Error=Error,e.Date=Date,e.Math=Math;var n=e.Object();return t(e,n),n},module.factory=t):(t(e,(e.NW||(e.NW=e.Object()))&&(e.NW.Dom||(e.NW.Dom=e.Object()))),e.NW.Dom.factory=t)}(this,function(e,t){var n,r,o,i,a,u,s,c,l,f,h,p="nwmatcher-1.3.3",d=t,m=e.document,g=m.documentElement,_="([~*^$|!]?={1})",v="[\\s]|[>+~][^>+~]",E="(?:[-+]?\\d*n)?[-+]?\\d*",y="\"[^\"]*\"|'[^']*'",N="\\[.*\\]|\\(.*\\)|\\{.*\\}",b="(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)",O="(?:-?[_a-zA-Z]{1}[-\\w]*|[^\\x00-\\xa0]+|\\\\.+)+",T="("+y+"|"+O+")",D="\\s*("+b+"*:?"+b+"+)\\s*(?:"+_+"\\s*"+T+")?\\s*",w=D.replace(T,"([\\x22\\x27]*)((?:\\\\?.)*?)\\3"),M="((?:"+E+"|"+y+"|[#.:]?|"+b+"+|\\["+D+"\\]|\\(.+\\)|\\s*|,)+)",x=".+",R="(?=\\s*[^>+~(){}<>])(\\*|(?:[#.:]?"+O+")|"+v+"|\\["+D+"\\]|\\("+M+"\\)|\\{"+x+"\\}|(?:,|\\s*))+",I=R.replace(M,".*"),S=e.RegExp(R,"g"),A=/^\s*|\s*$/g,C=e.RegExp("^((?!:not)([#.:]?|"+O+"|\\([^()]*\\))+|\\["+D+"\\])$"),L=/([^,\\()[\]]+|\[[^[\]]*\]|\[.*\]|\([^()]+\)|\(.*\)|\{[^{}]+\}|\{.*\}|\\.)+/g,j=e.RegExp("(\\["+D+"\\]|\\("+M+"\\)|\\\\.|[^\\s>+~])+","g"),k=e.RegExp(O+"|^$"),P="getElementsByTagName"in m,U="getElementsByClassName"in m,H=e.Object({a:1,A:1,area:1,AREA:1,link:1,LINK:1}),q=e.Object({checked:1,disabled:1,ismap:1,multiple:1,readonly:1,selected:1}),F=e.Object({value:"defaultValue",checked:"defaultChecked",selected:"defaultSelected"}),V=e.Object({action:2,cite:2,codebase:2,data:2,href:2,longdesc:2,lowsrc:2,src:2,usemap:2}),Y=e.Object({}),B=e.Object({"=":"n=='%m'","^=":"n.indexOf('%m')==0","*=":"n.indexOf('%m')>-1","|=":"(n+'-').indexOf('%m-')==0","~=":"(' '+n+' ').indexOf(' %m ')>-1","$=":"n.substr(n.length-'%m'.length)=='%m'"}),z=e.Object({ID:e.RegExp("^\\*?#("+b+"+)|"+N),TAG:e.RegExp("^("+b+"+)|"+N),CLASS:e.RegExp("^\\*?\\.("+b+"+$)|"+N)}),G=e.Object({spseudos:/^\:(root|empty|(?:first|last|only)(?:-child|-of-type)|nth(?:-last)?(?:-child|-of-type)\(\s*(even|odd|(?:[-+]{0,1}\d*n\s*)?[-+]{0,1}\s*\d*)\s*\))?(.*)/i,dpseudos:/^\:(link|visited|target|active|focus|hover|checked|disabled|enabled|selected|lang\(([-\w]{2,})\)|not\(([^()]*|.*)\))?(.*)/i,attribute:e.RegExp("^\\["+w+"\\](.*)"),children:/^\s*\>\s*(.*)/,adjacent:/^\s*\+\s*(.*)/,relative:/^\s*\~\s*(.*)/,ancestor:/^\s+(.*)/,universal:/^\*(.*)/,id:e.RegExp("^#("+b+"+)(.*)"),tagName:e.RegExp("^("+b+"+)(.*)"),className:e.RegExp("^\\.("+b+"+)(.*)")}),W=function(e,t,n){for(var r,o=-1;(r=t[++o])&&!1!==n(e[e.length]=r););return e},X=function(e,t){var n=m;i=e,m=e.ownerDocument||e,(t||n!==m)&&(g=m.documentElement,h="DiV"==m.createElement("DiV").nodeName,f=h||"string"!=typeof m.compatMode?function(){var e=m.createElement("div").style;return e&&(e.width=1)&&"1px"==e.width}():m.compatMode.indexOf("CSS")<0,st.CACHING&&d.setCache(!0,m))},$=function(e,t){for(var n=-1,r=null;(r=t[++n])&&r.getAttribute("id")!=e;);return r},Z="fileSize"in m?function(e,t){var n=null;return e=e.replace(/\\([^\\]{1})/g,"$1"),h||9!=t.nodeType?$(e,t.getElementsByTagName("*")):(n=t.getElementById(e))&&n.name==e&&t.getElementsByName?$(e,t.getElementsByName(e)):n}:function(e,t){return e=e.replace(/\\([^\\]{1})/g,"$1"),t.getElementById&&t.getElementById(e)||$(e,t.getElementsByTagName("*"))},Q=function(e,t){return t||(t=m),i!==t&&X(t),Z(e,t)},K=function(t,n){var r="*"==t,o=n,i=e.Array(),a=o.firstChild;for(r||(t=t.toUpperCase());o=a;)if(o.tagName>"@"&&(r||o.tagName.toUpperCase()==t)&&(i[i.length]=o),!(a=o.firstChild||o.nextSibling))for(;!a&&(o=o.parentNode)&&o!==n;)a=o.nextSibling;return i},J="compareDocumentPosition"in g?function(e,t){return 16==(16&e.compareDocumentPosition(t))}:"contains"in g?function(e,t){return 1==t.nodeType&&e.contains(t)}:function(e,t){for(;(t=t.parentNode)&&1==t.nodeType;)if(t===e)return!0;return!1},et=function(e,t){return t=t.toLowerCase(),"object"==typeof e[t]?e.attributes[t]&&e.attributes[t].value||"":"type"==t?e.getAttribute(t)||"":V[t]?e.getAttribute(t,2)||"":q[t]?e.getAttribute(t)?t:"false":(e=e.getAttributeNode(t))&&e.value||""},tt=g.hasAttribute?function(e,t){return e.hasAttribute(t)}:function(e,t){return t=t.toLowerCase(),F[t]?!!e[F[t]]:(e=e.getAttributeNode(t),!(!e||!e.specified))},nt=function(e){return e.getAttribute("href")&&H[e.nodeName]},rt=function(e){for(e=e.firstChild;e;){if(3==e.nodeType||e.nodeName>"@")return!1;e=e.nextSibling}return!0},ot=function(e,t){for(var n=1,r=t?"nextSibling":"previousSibling";e=e[r];)e.nodeName>"@"&&++n;return n},it=function(e,t){for(var n=1,r=t?"nextSibling":"previousSibling",o=e.nodeName;e=e[r];)e.nodeName==o&&++n;return n},at=function(t){if("string"==typeof t)return st[t];if("object"!=typeof t)return!1;for(var n in t)st[n]=!!t[n],"SIMPLENOT"==n&&(Nt=e.Object(),bt=e.Object(),Ot=e.Object(),Tt=e.Object());return S=e.RegExp(st.SIMPLENOT?R:I,"g"),!0},ut=function(t){if(st.VERBOSITY)throw e.Error(t);e.console&&e.console.log&&e.console.log(t)},st=e.Object({CACHING:!1,SIMPLENOT:!0,UNIQUE_ID:!0,USE_HTML5:!0,VERBOSITY:!0}),ct="function"!=typeof m.addEventListener,lt=e.Object({href:1,lang:1,src:1,style:1,title:1,type:1,xmlns:1,"xml:lang":1,"xml:space":1}),ft=ct?".toUpperCase()":"",ht="r[r.length]=c[k];if(f&&false===f(c[k]))break main;else continue main;",pt=ct?'if(e.nodeName<"A")continue;':"",dt=function(t,n,r){var o="string"==typeof t?t.match(L):t;if("string"==typeof n||(n=""),1==o.length)n+=gt(o[0],r?ht:"f&&f(k);return true;",r);else for(var i,a=-1,u=e.Object();i=o[++a];)i=i.replace(A,""),!u[i]&&(u[i]=!0)&&(n+=gt(i,r?ht:"f&&f(k);return true;",r));return r?e.Function("c,s,r,d,h,g,f,v","var N,n,x=0,k=-1,e;main:while((e=c[++k])){"+n+"}return r;"):e.Function("e,s,r,d,h,g,f,v","var N,n,x=0,k=e;"+n+"return false;")},mt="var z=v[@]||(v[@]=[]),l=z.length-1;while(l>=0&&z[l]!==e)--l;if(l!==-1){break;}z[z.length]=e;",gt=function(t,n,r){for(var o,i,a,u,s,c,l,p,d,g=0;t;){if(g++,s=t.match(G.universal))u="";else if(s=t.match(G.id))n="if("+(h?'s.getAttribute(e,"id")':'(e.submit?s.getAttribute(e,"id"):e.id)')+'=="'+s[1]+'"){'+n+"}";else if(s=t.match(G.tagName))n="if(e.nodeName"+(h?'=="'+s[1]+'"':ft+'=="'+s[1].toUpperCase()+'"')+"){"+n+"}";else if(s=t.match(G.className))n="if((n="+(h?'e.getAttribute("class")':"e.className")+')&&n.length&&(" "+'+(f?"n.toLowerCase()":"n")+'.replace(/\\s+/g," ")+" ").indexOf(" '+(f?s[1].toLowerCase():s[1])+' ")>-1){'+n+"}";else if(s=t.match(G.attribute)){if(s[2]&&!B[s[2]])return ut('Unsupported operator in attribute selectors "'+t+'"'),"";p="false",s[4]&&(d=lt[s[1].toLowerCase()],s[4]=(d?s[4].toLowerCase():s[4]).replace(/\\([0-9a-f]{2,2})/g,"\\x$1").replace(/(\x22|\x27)/g,"\\$1")),s[2]&&s[4]&&(p=B[s[2]])?p=p.replace(/\%m/g,s[4]):("!="==s[2]||"="==s[2])&&(p="n"+s[2]+'="'+s[4]+'"'),u="n=s."+(s[2]?"get":"has")+'Attribute(e,"'+s[1]+'")'+(d?".toLowerCase();":";"),n=u+"if("+(s[2]?p:"n")+"){"+n+"}"}else if(s=t.match(G.adjacent))n=(r?"":mt.replace(/@/g,g))+n,n="var N"+g+'=e;while(e&&(e=e.previousSibling)){if(e.nodeName>"@"){'+n+"break;}}e=N"+g+";";else if(s=t.match(G.relative))n=(r?"":mt.replace(/@/g,g))+n,n="var N"+g+"=e;e=e.parentNode.firstChild;while(e&&e!==N"+g+'){if(e.nodeName>"@"){'+n+"}e=e.nextSibling;}e=N"+g+";";else if(s=t.match(G.children))n=(r?"":mt.replace(/@/g,g))+n,n="var N"+g+"=e;while(e&&e!==h&&e!==g&&(e=e.parentNode)){"+n+"break;}e=N"+g+";";else if(s=t.match(G.ancestor))n=(r?"":mt.replace(/@/g,g))+n,n="var N"+g+"=e;while(e&&e!==h&&e!==g&&(e=e.parentNode)){"+n+"}e=N"+g+";";else if((s=t.match(G.spseudos))&&s[1])switch(s[1]){case"root":n=s[3]?"if(e===h||s.contains(h,e)){"+n+"}":"if(e===h){"+n+"}";break;case"empty":n="if(s.isEmpty(e)){"+n+"}";break;default:if(s[1]&&s[2]){if("n"==s[2]){n="if(e!==h){"+n+"}";break}"even"==s[2]?(o=2,i=0):"odd"==s[2]?(o=2,i=1):(i=(a=s[2].match(/(-?\d+)$/))?e.parseInt(a[1],10):0,o=(a=s[2].match(/(-?\d*)n/i))?e.parseInt(a[1],10):0,a&&"-"==a[1]&&(o=-1)),p=o>1?/last/i.test(s[1])?"(n-("+i+"))%"+o+"==0":"n>="+i+"&&(n-("+i+"))%"+o+"==0":-1>o?/last/i.test(s[1])?"(n-("+i+"))%"+o+"==0":"n<="+i+"&&(n-("+i+"))%"+o+"==0":0===o?"n=="+i:/last/i.test(s[1])?-1==o?"n>="+i:"n<="+i:-1==o?"n<="+i:"n>="+i,n="if(e!==h){n=s["+(/-of-type/i.test(s[1])?'"nthOfType"':'"nthElement"')+"](e,"+(/last/i.test(s[1])?"true":"false")+");if("+p+"){"+n+"}}"}else o=/first/i.test(s[1])?"previous":"next",a=/only/i.test(s[1])?"previous":"next",i=/first|last/i.test(s[1]),d=/-of-type/i.test(s[1])?"&&n.nodeName!=e.nodeName":'&&n.nodeName<"@"',n="if(e!==h){"+("n=e;while((n=n."+o+"Sibling)"+d+");if(!n){"+(i?n:"n=e;while((n=n."+a+"Sibling)"+d+");if(!n){"+n+"}")+"}")+"}"}else if((s=t.match(G.dpseudos))&&s[1])switch(s[1].match(/^\w+/)[0]){case"not":if(u=s[3].replace(A,""),st.SIMPLENOT&&!C.test(u))return ut('Negation pseudo-class only accepts simple selectors "'+s.join("")+'"'),"";n="compatMode"in m?"if(!"+dt(u,"",!1)+"(e,s,r,d,h,g)){"+n+"}":'if(!s.match(e, "'+u.replace(/\x22/g,'\\"')+'",g)){'+n+"}";break;case"checked":n='if((typeof e.form!=="undefined"&&(/^(?:radio|checkbox)$/i).test(e.type)&&e.checked)'+(st.USE_HTML5?"||(/^option$/i.test(e.nodeName)&&(e.selected||e.checked))":"")+"){"+n+"}";break;case"disabled":n='if(((typeof e.form!=="undefined"'+(st.USE_HTML5?"":"&&!(/^hidden$/i).test(e.type)")+")||s.isLink(e))&&e.disabled===true){"+n+"}";break;case"enabled":n='if(((typeof e.form!=="undefined"'+(st.USE_HTML5?"":"&&!(/^hidden$/i).test(e.type)")+")||s.isLink(e))&&e.disabled===false){"+n+"}";break;case"lang":p="",s[2]&&(p=s[2].substr(0,2)+"-"),n='do{(n=e.lang||"").toLowerCase();if((n==""&&h.lang=="'+s[2].toLowerCase()+'")||(n&&(n=="'+s[2].toLowerCase()+'"||n.substr(0,3)=="'+p.toLowerCase()+'"))){'+n+"break;}}while((e=e.parentNode)&&e!==g);";break;case"target":a=m.location?m.location.hash:"",a&&(n='if(e.id=="'+a.slice(1)+'"){'+n+"}");break;case"link":n="if(s.isLink(e)&&!e.visited){"+n+"}";break;case"visited":n="if(s.isLink(e)&&e.visited){"+n+"}";break;case"active":n="if(e===d.activeElement){"+n+"}";break;case"hover":n="if(e===d.hoverElement){"+n+"}";break;case"focus":n="hasFocus"in m?'if(e===d.activeElement&&d.hasFocus()&&(e.type||e.href||typeof e.tabIndex=="number")){'+n+"}":"if(e===d.activeElement&&(e.type||e.href)){"+n+"}";break;case"selected":n="if(/^option$/i.test(e.nodeName)&&(e.selected||e.checked)){"+n+"}"}else{u=!1,l=!1;for(u in Y)if((s=t.match(Y[u].Expression))&&s[1]&&(c=Y[u].Callback(s,n),n=c.source,l=c.status))break;if(!l)return ut('Unknown pseudo-class selector "'+t+'"'),"";if(!u)return ut('Unknown token in selector "'+t+'"'),""}if(!s)return ut('Invalid syntax in selector "'+t+'"'),"";t=s&&s[s.length-1]}return n},_t=function(e,t,r,o){var a;if(!(e&&e.nodeName>"@"))return ut("Invalid element argument"),!1;if("string"!=typeof t)return ut("Invalid selector argument"),!1;if(i!==r&&X(r||(r=e.ownerDocument)),t=t.replace(A,""),st.SHORTCUTS&&(t=d.shortcuts(t,e,r)),u!=t){if(!(a=t.match(S))||a[0]!=t)return ut('The string "'+t+'", is not a valid CSS selector'),!1;n=(a=t.match(L)).length<2,u=t,c=a}else a=c;return bt[t]&&Nt[t]===r||(bt[t]=dt(n?[t]:a,"",!1),Nt[t]=r),bt[t](e,Dt,[],m,g,r,o,{})},vt=function(e,t){return Et(e,t,function(){return!1})[0]||null},Et=function(t,n,u){var c,f,p,_,v,E=t;if(0===arguments.length)return ut("Not enough arguments"),[];if("string"!=typeof t)return[];if(n&&!/1|9|11/.test(n.nodeType))return ut("Invalid or illegal context element"),[];if(i!==n&&X(n||(n=m)),st.CACHING&&(p=d.loadResults(E,n,m,g)))return u?W([],p,u):p;if(t=t.replace(A,""),st.SHORTCUTS&&(t=d.shortcuts(t,n)),c=s!=t){if(!(_=t.match(S))||_[0]!=t)return ut('The string "'+t+'", is not a valid CSS selector'),[];r=(_=t.match(L)).length<2,s=t,l=_}else _=l;if(11==n.nodeType)p=K("*",n);else if(r){if(c&&(_=t.match(j),v=_[_.length-1],o=v.split(":not")[0],a=t.length-v.length),st.UNIQUE_ID&&(_=o.match(z.ID))&&(v=_[1])?(f=Z(v,n))&&(_t(f,t)?(u&&u(f),p=e.Array(f)):p=e.Array()):st.UNIQUE_ID&&(_=t.match(z.ID))&&(v=_[1])&&((f=Z(v,m))?"#"+v==t?(u&&u(f),p=e.Array(f)):n=/[>+~]/.test(t)?f.parentNode:f:p=e.Array()),p)return st.CACHING&&d.saveResults(E,n,m,p),p;if(!h&&P&&(_=o.match(z.TAG))&&(v=_[1])){if(0===(p=n.getElementsByTagName(v)).length)return[];t=t.slice(0,a)+t.slice(a).replace(v,"*")}else if(!h&&U&&(_=o.match(z.CLASS))&&(v=_[1])){if(0===(p=n.getElementsByClassName(v.replace(/\\([^\\]{1})/g,"$1"))).length)return[];t=t.slice(0,a)+t.slice(a).replace("."+v,k.test(t.charAt(t.indexOf(v)-1))?"":"*")}}return p||(p=ct?/^(?:applet|object)$/i.test(n.nodeName)?n.childNodes:n.all:n.getElementsByTagName("*")),Tt[t]&&Ot[t]===n||(Tt[t]=dt(r?[t]:_,pt,!0),Ot[t]=n),p=Tt[t](p,Dt,[],m,g,n,u,{}),st.CACHING&&d.saveResults(E,n,m,p),p},yt=function(e){return e},Nt=e.Object(),bt=e.Object(),Ot=e.Object(),Tt=e.Object(),Dt=e.Object({byId:Z,match:_t,select:Et,isLink:nt,isEmpty:rt,contains:J,nthOfType:it,nthElement:ot,getAttribute:et,hasAttribute:tt});d.ACCEPT_NODE=ht,d.byId=Q,d.match=_t,d.first=vt,d.select=Et,d.compile=dt,d.contains=J,d.configure=at,d.getAttribute=et,d.hasAttribute=tt,d.setCache=yt,d.shortcuts=yt,d.loadResults=yt,d.saveResults=yt,d.emit=ut,d.Config=st,d.Snapshot=Dt,d.Operators=B,d.Selectors=Y,d.Version=p,d.registerOperator=function(e,t){B[e]||(B[e]=t)},d.registerSelector=function(t,n,r){Y[t]||(Y[t]=e.Object({Expression:n,Callback:r}))},X(m,!0)});
//# sourceMappingURL=jspm_packages/npm/nwmatcher@1.3.3/src/nwmatcher-noqsa.js.map