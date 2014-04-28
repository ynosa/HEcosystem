define(["./core","./var/rnotwhite","./ajax/var/nonce","./ajax/var/rquery","./core/init","./ajax/parseJSON","./ajax/parseXML","./deferred"],function(e,t,n,r){function i(n){return function(r,i){"string"!=typeof r&&(i=r,r="*");var o,s=0,a=r.toLowerCase().match(t)||[];if(e.isFunction(i))for(;o=a[s++];)"+"===o[0]?(o=o.slice(1)||"*",(n[o]=n[o]||[]).unshift(i)):(n[o]=n[o]||[]).push(i)}}function o(t,n,r,i){function o(u){var l;return s[u]=!0,e.each(t[u]||[],function(e,t){var u=t(n,r,i);return"string"!=typeof u||a||s[u]?a?!(l=u):void 0:(n.dataTypes.unshift(u),o(u),!1)}),l}var s={},a=t===x;return o(n.dataTypes[0])||!s["*"]&&o("*")}function s(t,n){var r,i,o=e.ajaxSettings.flatOptions||{};for(r in n)void 0!==n[r]&&((o[r]?t:i||(i={}))[r]=n[r]);return i&&e.extend(!0,t,i),t}function a(e,t,n){for(var r,i,o,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):void 0}function u(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(f){return{state:"parsererror",error:s?f:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}var l,c,f=/#.*$/,p=/([?&])_=[^&]*/,d=/^(.*?):[ \t]*([^\r\n]*)$/gm,h=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,g=/^(?:GET|HEAD)$/,m=/^\/\//,v=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,y={},x={},b="*/".concat("*");try{c=location.href}catch(w){c=document.createElement("a"),c.href="",c=c.href}return l=v.exec(c.toLowerCase())||[],e.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:c,type:"GET",isLocal:h.test(l[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":b,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":e.parseJSON,"text xml":e.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,n){return n?s(s(t,e.ajaxSettings),n):s(e.ajaxSettings,t)},ajaxPrefilter:i(y),ajaxTransport:i(x),ajax:function(i,s){function h(t,n,r,i){var o,s,l,c,f,p=n;2!==P&&(P=2,k&&clearTimeout(k),w=void 0,C=i||"",W.readyState=t>0?4:0,o=t>=200&&300>t||304===t,r&&(c=a(D,W,r)),c=u(D,c,W,o),o?(D.ifModified&&(f=W.getResponseHeader("Last-Modified"),f&&(e.lastModified[T]=f),f=W.getResponseHeader("etag"),f&&(e.etag[T]=f)),204===t||"HEAD"===D.type?p="nocontent":304===t?p="notmodified":(p=c.state,s=c.data,l=c.error,o=!l)):(l=p,(t||!p)&&(p="error",0>t&&(t=0))),W.status=t,W.statusText=(n||p)+"",o?q.resolveWith(A,[s,p,W]):q.rejectWith(A,[W,p,l]),W.statusCode(O),O=void 0,E&&L.trigger(o?"ajaxSuccess":"ajaxError",[W,D,o?s:l]),H.fireWith(A,[W,p]),E&&(L.trigger("ajaxComplete",[W,D]),--e.active||e.event.trigger("ajaxStop")))}"object"==typeof i&&(s=i,i=void 0),s=s||{};var w,T,C,N,k,j,E,S,D=e.ajaxSetup({},s),A=D.context||D,L=D.context&&(A.nodeType||A.jquery)?e(A):e.event,q=e.Deferred(),H=e.Callbacks("once memory"),O=D.statusCode||{},F={},M={},P=0,R="canceled",W={readyState:0,getResponseHeader:function(e){var t;if(2===P){if(!N)for(N={};t=d.exec(C);)N[t[1].toLowerCase()]=t[2];t=N[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===P?C:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return P||(e=M[n]=M[n]||e,F[e]=t),this},overrideMimeType:function(e){return P||(D.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>P)for(t in e)O[t]=[O[t],e[t]];else W.always(e[W.status]);return this},abort:function(e){var t=e||R;return w&&w.abort(t),h(0,t),this}};if(q.promise(W).complete=H.add,W.success=W.done,W.error=W.fail,D.url=((i||D.url||c)+"").replace(f,"").replace(m,l[1]+"//"),D.type=s.method||s.type||D.method||D.type,D.dataTypes=e.trim(D.dataType||"*").toLowerCase().match(t)||[""],null==D.crossDomain&&(j=v.exec(D.url.toLowerCase()),D.crossDomain=!(!j||j[1]===l[1]&&j[2]===l[2]&&(j[3]||("http:"===j[1]?"80":"443"))===(l[3]||("http:"===l[1]?"80":"443")))),D.data&&D.processData&&"string"!=typeof D.data&&(D.data=e.param(D.data,D.traditional)),o(y,D,s,W),2===P)return W;E=D.global,E&&0===e.active++&&e.event.trigger("ajaxStart"),D.type=D.type.toUpperCase(),D.hasContent=!g.test(D.type),T=D.url,D.hasContent||(D.data&&(T=D.url+=(r.test(T)?"&":"?")+D.data,delete D.data),D.cache===!1&&(D.url=p.test(T)?T.replace(p,"$1_="+n++):T+(r.test(T)?"&":"?")+"_="+n++)),D.ifModified&&(e.lastModified[T]&&W.setRequestHeader("If-Modified-Since",e.lastModified[T]),e.etag[T]&&W.setRequestHeader("If-None-Match",e.etag[T])),(D.data&&D.hasContent&&D.contentType!==!1||s.contentType)&&W.setRequestHeader("Content-Type",D.contentType),W.setRequestHeader("Accept",D.dataTypes[0]&&D.accepts[D.dataTypes[0]]?D.accepts[D.dataTypes[0]]+("*"!==D.dataTypes[0]?", "+b+"; q=0.01":""):D.accepts["*"]);for(S in D.headers)W.setRequestHeader(S,D.headers[S]);if(D.beforeSend&&(D.beforeSend.call(A,W,D)===!1||2===P))return W.abort();R="abort";for(S in{success:1,error:1,complete:1})W[S](D[S]);if(w=o(x,D,s,W)){W.readyState=1,E&&L.trigger("ajaxSend",[W,D]),D.async&&D.timeout>0&&(k=setTimeout(function(){W.abort("timeout")},D.timeout));try{P=1,w.send(F,h)}catch($){if(!(2>P))throw $;h(-1,$)}}else h(-1,"No Transport");return W},getJSON:function(t,n,r){return e.get(t,n,r,"json")},getScript:function(t,n){return e.get(t,void 0,n,"script")}}),e.each(["get","post"],function(t,n){e[n]=function(t,r,i,o){return e.isFunction(r)&&(o=o||i,i=r,r=void 0),e.ajax({url:t,type:n,dataType:o,data:r,success:i})}}),e.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,n){e.fn[n]=function(e){return this.on(n,e)}}),e});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\ajax.js.map