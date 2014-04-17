// Copyright Joyent, Inc. and other Node contributors.
function WriteReq(t,e,n){this.chunk=t,this.encoding=e,this.callback=n}function WritableState(t,e){t=t||{};var n=t.highWaterMark;this.highWaterMark=n||0===n?n:16384,this.objectMode=!!t.objectMode,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var r=t.decodeStrings===!1;this.decodeStrings=!r,this.defaultEncoding=t.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(t){onwrite(e,t)},this.writecb=null,this.writelen=0,this.buffer=[]}function Writable(t){return this instanceof Writable||this instanceof Stream.Duplex?(this._writableState=new WritableState(t,this),this.writable=!0,void Stream.call(this)):new Writable(t)}function writeAfterEnd(t,e,n){var r=new Error("write after end");t.emit("error",r),setImmediate(function(){n(r)})}function validChunk(t,e,n,r){var i=!0;if(!Buffer.isBuffer(n)&&"string"!=typeof n&&null!==n&&void 0!==n&&!e.objectMode){var o=new TypeError("Invalid non-string/buffer chunk");t.emit("error",o),setImmediate(function(){r(o)}),i=!1}return i}function decodeChunk(t,e,n){return t.objectMode||t.decodeStrings===!1||"string"!=typeof e||(e=new Buffer(e,n)),e}function writeOrBuffer(t,e,n,r,i){n=decodeChunk(e,n,r);var o=e.objectMode?1:n.length;e.length+=o;var a=e.length<e.highWaterMark;return e.needDrain=!a,e.writing?e.buffer.push(new WriteReq(n,r,i)):doWrite(t,e,o,n,r,i),a}function doWrite(t,e,n,r,i,o){e.writelen=n,e.writecb=o,e.writing=!0,e.sync=!0,t._write(r,i,e.onwrite),e.sync=!1}function onwriteError(t,e,n,r,i){n?setImmediate(function(){i(r)}):i(r),t.emit("error",r)}function onwriteStateUpdate(t){t.writing=!1,t.writecb=null,t.length-=t.writelen,t.writelen=0}function onwrite(t,e){var n=t._writableState,r=n.sync,i=n.writecb;if(onwriteStateUpdate(n),e)onwriteError(t,n,r,e,i);else{var o=needFinish(t,n);o||n.bufferProcessing||!n.buffer.length||clearBuffer(t,n),r?setImmediate(function(){afterWrite(t,n,o,i)}):afterWrite(t,n,o,i)}}function afterWrite(t,e,n,r){n||onwriteDrain(t,e),r(),n&&finishMaybe(t,e)}function onwriteDrain(t,e){0===e.length&&e.needDrain&&(e.needDrain=!1,t.emit("drain"))}function clearBuffer(t,e){e.bufferProcessing=!0;for(var n=0;n<e.buffer.length;n++){var r=e.buffer[n],i=r.chunk,o=r.encoding,a=r.callback,s=e.objectMode?1:i.length;if(doWrite(t,e,s,i,o,a),e.writing){n++;break}}e.bufferProcessing=!1,n<e.buffer.length?e.buffer=e.buffer.slice(n):e.buffer.length=0}function needFinish(t,e){return e.ending&&0===e.length&&!e.finished&&!e.writing}function finishMaybe(t,e){var n=needFinish(t,e);return n&&(e.finished=!0,t.emit("finish")),n}function endWritable(t,e,n){e.ending=!0,finishMaybe(t,e),n&&(e.finished?setImmediate(n):t.once("finish",n)),e.ended=!0}module.exports=Writable,Writable.WritableState=WritableState;var isUint8Array="undefined"!=typeof Uint8Array?function(t){return t instanceof Uint8Array}:function(t){return t&&t.constructor&&"Uint8Array"===t.constructor.name},isArrayBuffer="undefined"!=typeof ArrayBuffer?function(t){return t instanceof ArrayBuffer}:function(t){return t&&t.constructor&&"ArrayBuffer"===t.constructor.name},inherits=require("npm:inherits@^2.0.1"),Stream=require("./stream"),setImmediate=require("@@nodeProcess").nextTick,Buffer=require("../buffer").Buffer;inherits(Writable,Stream),Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))},Writable.prototype.write=function(t,e,n){var r=this._writableState,i=!1;return"function"==typeof e&&(n=e,e=null),!Buffer.isBuffer(t)&&isUint8Array(t)&&(t=new Buffer(t)),isArrayBuffer(t)&&"undefined"!=typeof Uint8Array&&(t=new Buffer(new Uint8Array(t))),Buffer.isBuffer(t)?e="buffer":e||(e=r.defaultEncoding),"function"!=typeof n&&(n=function(){}),r.ended?writeAfterEnd(this,r,n):validChunk(this,r,t,n)&&(i=writeOrBuffer(this,r,t,e,n)),i},Writable.prototype._write=function(t,e,n){n(new Error("not implemented"))},Writable.prototype.end=function(t,e,n){var r=this._writableState;"function"==typeof t?(n=t,t=null,e=null):"function"==typeof e&&(n=e,e=null),"undefined"!=typeof t&&null!==t&&this.write(t,e),r.ending||r.finished||endWritable(this,r,n)};
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/stream\writable.src.js.map