// DOM APIs, for completeness
"undefined"!=typeof setTimeout&&(exports.setTimeout=setTimeout),"undefined"!=typeof clearTimeout&&(exports.clearTimeout=clearTimeout),"undefined"!=typeof setInterval&&(exports.setInterval=setInterval),"undefined"!=typeof clearInterval&&(exports.clearInterval=clearInterval),exports.enroll=function(e,t){e._timeoutID=setTimeout(e._onTimeout,t)},exports.unenroll=function(e){clearTimeout(e._timeoutID)},exports.active=function(){},exports.setImmediate=require("@@nodeProcess").nextTick;