/*
 * Copyright (C) 2007-2014 Diego Perini
 * All rights reserved.
 *
 * this is just a small example to show
 * how an extension for NWMatcher could be
 * adapted to handle special jQuery selectors
 *
 * Child Selectors
 * :even, :odd, :eq, :lt, :gt, :first, :last, :nth
 *
 * Pseudo Selectors
 * :has, :button, :header, :input, :checkbox, :radio, :file, :image
 * :password, :reset, :submit, :text, :hidden, :visible, :parent
 *
 */
NW.Dom.registerSelector("jquery:child",/^\:((?:(nth|eq|lt|gt)\(([^()]*)\))|(?:even|odd|first|last))(.*)/i,function(t){return function(e,n){var r=!0,o=NW.Dom.ACCEPT_NODE;switch(e[1].toLowerCase()){case"odd":n=n.replace(o,"if((x=x^1)==0){"+o+"}");break;case"even":n=n.replace(o,"if((x=x^1)==1){"+o+"}");break;case"first":n="n=h.getElementsByTagName(e.nodeName);if(n.length&&n[0]===e){"+n+"}";break;case"last":n="n=h.getElementsByTagName(e.nodeName);if(n.length&&n[n.length-1]===e){"+n+"}";break;default:switch(e[2].toLowerCase()){case"nth":n="n=h.getElementsByTagName(e.nodeName);if(n.length&&n["+e[3]+"]===e){"+n+"}";break;case"eq":n=n.replace(o,"if(x++=="+e[3]+"){"+o+"}");break;case"lt":n=n.replace(o,"if(x++<"+e[3]+"){"+o+"}");break;case"gt":n=n.replace(o,"if(x++>"+e[3]+"){"+o+"}");break;default:r=!1}}return t.Object({source:n,status:r})}}(this)),NW.Dom.registerSelector("jquery:pseudo",/^\:(has|checkbox|file|image|password|radio|reset|submit|text|button|input|header|hidden|visible|parent)(?:\(\s*(["']*)?([^'"()]*)\2\s*\))?(.*)/i,function(t){return function(e,n){var r=!0,o=NW.Dom.ACCEPT_NODE;switch(e[1].toLowerCase()){case"has":n=n.replace(o,'if(e.getElementsByTagName("'+e[3].replace(/^\s|\s$/g,"")+'")[0]){'+o+"}");break;case"checkbox":case"file":case"image":case"password":case"radio":case"reset":case"submit":case"text":n="if(/^"+e[1]+"$/i.test(e.type)){"+n+"}";break;case"button":case"input":n="if(e.type||/button/i.test(e.nodeName)){"+n+"}";break;case"header":n="if(/h[1-6]/i.test(e.nodeName)){"+n+"}";break;case"hidden":n="if(!e.offsetWidth&&!e.offsetHeight){"+n+"}";break;case"visible":n="if(e.offsetWidth||e.offsetHeight){"+n+"}";break;case"parent":n+="if(e.firstChild){"+n+"}";break;default:r=!1}return t.Object({source:n,status:r})}}(this));
//# sourceMappingURL=jspm_packages/npm/nwmatcher@1.3.3/src/modules/nwmatcher-jquery.js.map