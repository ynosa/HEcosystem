// DOM APIs, for completeness
"undefined"!=typeof setTimeout&&(exports.setTimeout=setTimeout),"undefined"!=typeof clearTimeout&&(exports.clearTimeout=clearTimeout),"undefined"!=typeof setInterval&&(exports.setInterval=setInterval),"undefined"!=typeof clearInterval&&(exports.clearInterval=clearInterval),exports.enroll=function(t,e){t._timeoutID=setTimeout(t._onTimeout,e)},exports.unenroll=function(t){clearTimeout(t._timeoutID)},exports.active=function(){},exports.setImmediate=require("@@nodeProcess").nextTick;
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/timers.js.map