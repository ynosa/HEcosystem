var http=module.exports,EventEmitter=require("../events").EventEmitter,Request=require("./lib/request"),url=require("../url");http.request=function(t,n){"string"==typeof t&&(t=url.parse(t)),t||(t={}),t.host||t.port||(t.port=parseInt(window.location.port,10)),!t.host&&t.hostname&&(t.host=t.hostname),t.scheme||(t.scheme=window.location.protocol.split(":")[0]),t.host||(t.host=window.location.hostname||window.location.host),/:/.test(t.host)&&(t.port||(t.port=t.host.split(":")[1]),t.host=t.host.split(":")[0]),t.port||(t.port="https"==t.scheme?443:80);var e=new Request(new xhrHttp,t);return n&&e.on("response",n),e},http.get=function(t,n){t.method="GET";var e=http.request(t,n);return e.end(),e},http.Agent=function(){},http.Agent.defaultMaxSockets=4;var xhrHttp=function(){if("undefined"==typeof window)throw new Error("no window object present");if(window.XMLHttpRequest)return window.XMLHttpRequest;if(window.ActiveXObject){for(var t=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Microsoft.XMLHTTP"],n=0;n<t.length;n++)try{var e=new window.ActiveXObject(t[n]);return function(){if(e){var r=e;return e=null,r}return new window.ActiveXObject(t[n])}}catch(r){}throw new Error("ajax not supported in this browser")}throw new Error("ajax not supported in this browser")}();
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/http\index.js.map