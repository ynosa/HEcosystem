define(["../core","../var/support","../ajax"],function(e,t){e.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var n=0,r={},i={0:200,1223:204},o=e.ajaxSettings.xhr();window.ActiveXObject&&e(window).on("unload",function(){for(var e in r)r[e]()}),t.cors=!!o&&"withCredentials"in o,t.ajax=o=!!o,e.ajaxTransport(function(e){var s;return t.cors||o&&!e.crossDomain?{send:function(t,o){var a,u=e.xhr(),c=++n;if(u.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(a in e.xhrFields)u[a]=e.xhrFields[a];e.mimeType&&u.overrideMimeType&&u.overrideMimeType(e.mimeType),e.crossDomain||t["X-Requested-With"]||(t["X-Requested-With"]="XMLHttpRequest");for(a in t)u.setRequestHeader(a,t[a]);s=function(e){return function(){s&&(delete r[c],s=u.onload=u.onerror=null,"abort"===e?u.abort():"error"===e?o(u.status,u.statusText):o(i[u.status]||u.status,u.statusText,"string"==typeof u.responseText?{text:u.responseText}:void 0,u.getAllResponseHeaders()))}},u.onload=s(),u.onerror=s("error"),s=r[c]=s("abort"),u.send(e.hasContent&&e.data||null)},abort:function(){s&&s()}}:void 0})});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\ajax\xhr.js.map