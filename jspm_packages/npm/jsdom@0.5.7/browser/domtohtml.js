//List from node-htmlparser
function stringifyDoctype(n){if(n.ownerDocument&&n.ownerDocument._fullDT)return n.ownerDocument._fullDT;var t="<!DOCTYPE "+n.name;return n.publicId&&(t+=' PUBLIC "'+n.publicId+'" '),!n.publicId&&n.systemId&&(t+=" SYSTEM "),n.systemId&&(t+=n.systemId.indexOf('"')>-1?"'"+n.systemId+"'":'"'+n.systemId+'"'),t+=">"}var singleTags={area:1,base:1,basefont:1,br:1,col:1,frame:1,hr:1,img:1,input:1,isindex:1,link:1,meta:1,param:1,embed:1},expr={upperCaseChars:/([A-Z])/g,breakBetweenTags:/(<(\/?\w+).*?>)(?=<(?!\/\2))/gi,singleTag:function(){var n=[];for(var t in singleTags)n.push(t);return new RegExp("<"+n.join("|<"),"i")}()},uncanon=function(n,t){return"-"+t.toLowerCase()},HTMLEncode=require("./htmlencoding").HTMLEncode;exports.stringifyElement=function(n){var t,e=n.tagName.toLowerCase(),r={start:"<"+e,end:""},u=[],i=null;if(n.attributes.length)for(r.start+=" ",t=0;t<n.attributes.length;t++)i=n.attributes.item(t),u.push(i.name+'="'+HTMLEncode(i.nodeValue,!0)+'"');return r.start+=u.join(" "),singleTags[e]?(r.start+=" />",r.end=""):(r.start+=">",r.end="</"+e+">"),r};var rawTextElements=/SCRIPT|STYLE/i;exports.makeHtmlGenerator=function(n,t){return n=n||"",t=t||"",function e(r,u,i){var o,a,s="";if(i=i||"",r){r.nodeType&&r.nodeType===r.ENTITY_REFERENCE_NODE&&(r=r._entity);var c=u||rawTextElements.test(r.nodeName);switch(r.nodeType){case r.ELEMENT_NODE:if(o=exports.stringifyElement(r),s+=c?i+o.start:i+o.start,r._childNodes.length>0){for(r._childNodes[0].nodeType!==r.TEXT_NODE&&(s+=t),a=0;a<r._childNodes.length;a++)s+=e(r._childNodes[a],c,i+n);r._childNodes[r._childNodes.length-1].nodeType!==r.TEXT_NODE&&(s+=i),s+=o.end+t}else s+=((u?r.nodeValue:HTMLEncode(r.nodeValue,!1))||"")+o.end+t;break;case r.TEXT_NODE:n&&/^[\s\n]*$/.test(r.nodeValue)||(s+=(u?r.nodeValue:HTMLEncode(r.nodeValue,!1))||"");break;case r.COMMENT_NODE:s+=i+"<!--"+r.nodeValue+"-->"+t;break;case r.DOCUMENT_NODE:for(a=0;a<r._childNodes.length;a++)s+=e(r._childNodes[a],c,i);break;case r.DOCUMENT_TYPE_NODE:s+=stringifyDoctype(r)}}return s}},exports.domToHtml=function(n,t,e){var r=exports.makeHtmlGenerator(t?"":"  ",t?"":"\n");if(n._toArray&&(n=n._toArray()),"undefined"!=typeof n.length){for(var u="",i=0,o=n.length;o>i;i++)u+=r(n[i],e);return u}return r(n,e)};
//# sourceMappingURL=jspm_packages/npm/jsdom@0.5.7/browser/domtohtml.js.map