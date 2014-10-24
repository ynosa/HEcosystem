// Copyright Joyent, Inc. and other Node contributors.
function normalizeArray(t,e){for(var n=0,r=t.length-1;r>=0;r--){var i=t[r];"."===i?t.splice(r,1):".."===i?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}function filter(t,e){if(t.filter)return t.filter(e);for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,splitPath=function(t){return splitPathRe.exec(t).slice(1)};exports.resolve=function(){for(var t="",e=!1,n=arguments.length-1;n>=-1&&!e;n--){var r=n>=0?arguments[n]:process.cwd();if("string"!=typeof r)throw new TypeError("Arguments to path.resolve must be strings");r&&(t=r+"/"+t,e="/"===r.charAt(0))}return t=normalizeArray(filter(t.split("/"),function(t){return!!t}),!e).join("/"),(e?"/":"")+t||"."},exports.normalize=function(t){var e=exports.isAbsolute(t),n="/"===substr(t,-1);return t=normalizeArray(filter(t.split("/"),function(t){return!!t}),!e).join("/"),t||e||(t="."),t&&n&&(t+="/"),(e?"/":"")+t},exports.isAbsolute=function(t){return"/"===t.charAt(0)},exports.join=function(){var t=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(t,function(t){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},exports.relative=function(t,e){function n(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n-e+1)}t=exports.resolve(t).substr(1),e=exports.resolve(e).substr(1);for(var r=n(t.split("/")),i=n(e.split("/")),o=Math.min(r.length,i.length),a=o,u=0;o>u;u++)if(r[u]!==i[u]){a=u;break}for(var s=[],u=a;u<r.length;u++)s.push("..");return s=s.concat(i.slice(a)),s.join("/")},exports.sep="/",exports.delimiter=":",exports.dirname=function(t){var e=splitPath(t),n=e[0],r=e[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},exports.basename=function(t,e){var n=splitPath(t)[2];return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},exports.extname=function(t){return splitPath(t)[3]};var substr="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return 0>e&&(e=t.length+e),t.substr(e,n)};
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/path.src.js.map