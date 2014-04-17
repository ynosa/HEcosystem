var Stream=require("../../stream"),Response=require("./response"),Base64=require("npm:Base64@^0.2.0"),inherits=require("npm:inherits@^2.0.1"),Request=module.exports=function(t,e){var n=this;n.writable=!0,n.xhr=t,n.body=[],n.uri=(e.scheme||"http")+"://"+e.host+(e.port?":"+e.port:"")+(e.path||"/");try{t.withCredentials=!0}catch(r){}if(t.open(e.method||"GET",n.uri,!0),e.headers)for(var i=objectKeys(e.headers),o=0;o<i.length;o++){var a=i[o];if(n.isSafeRequestHeader(a)){var u=e.headers[a];if(isArray(u))for(var s=0;s<u.length;s++)t.setRequestHeader(a,u[s]);else t.setRequestHeader(a,u)}}e.auth&&this.setHeader("Authorization","Basic "+Base64.btoa(e.auth));var f=new Response;f.on("close",function(){n.emit("close")}),f.on("ready",function(){n.emit("response",f)}),t.onreadystatechange=function(){f.handle(t)}};inherits(Request,Stream),Request.prototype.setHeader=function(t,e){if(isArray(e))for(var n=0;n<e.length;n++)this.xhr.setRequestHeader(t,e[n]);else this.xhr.setRequestHeader(t,e)},Request.prototype.write=function(t){this.body.push(t)},Request.prototype.destroy=function(){this.xhr.abort(),this.emit("close")},Request.prototype.end=function(t){if(void 0!==t&&this.body.push(t),0===this.body.length)this.xhr.send("");else if("string"==typeof this.body[0])this.xhr.send(this.body.join(""));else if(isArray(this.body[0])){for(var e=[],n=0;n<this.body.length;n++)e.push.apply(e,this.body[n]);this.xhr.send(e)}else if(/Array/.test(Object.prototype.toString.call(this.body[0]))){for(var r=0,n=0;n<this.body.length;n++)r+=this.body[n].length;for(var e=new this.body[0].constructor(r),i=0,n=0;n<this.body.length;n++)for(var o=this.body[n],a=0;a<o.length;a++)e[i++]=o[a];this.xhr.send(e)}else{for(var e="",n=0;n<this.body.length;n++)e+=this.body[n].toString();this.xhr.send(e)}},Request.unsafeHeaders=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","content-transfer-encoding","date","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"],Request.prototype.isSafeRequestHeader=function(t){return t?-1===indexOf(Request.unsafeHeaders,t.toLowerCase()):!1};var objectKeys=Object.keys||function(t){var e=[];for(var n in t)e.push(n);return e},isArray=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},indexOf=function(t,e){if(t.indexOf)return t.indexOf(e);for(var n=0;n<t.length;n++)if(t[n]===e)return n;return-1};
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/http\lib\request.js.map