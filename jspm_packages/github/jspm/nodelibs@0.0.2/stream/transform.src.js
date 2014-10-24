// Copyright Joyent, Inc. and other Node contributors.
function TransformState(t,e){this.afterTransform=function(t,n){return afterTransform(e,t,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null}function afterTransform(t,e,n){var r=t._transformState;r.transforming=!1;var i=r.writecb;if(!i)return t.emit("error",new Error("no writecb in Transform class"));r.writechunk=null,r.writecb=null,null!==n&&void 0!==n&&t.push(n),i&&i(e);var o=t._readableState;o.reading=!1,(o.needReadable||o.length<o.highWaterMark)&&t._read(o.highWaterMark)}function Transform(t){if(!(this instanceof Transform))return new Transform(t);Duplex.call(this,t);var e=(this._transformState=new TransformState(t,this),this);this._readableState.needReadable=!0,this._readableState.sync=!1,this.once("finish",function(){"function"==typeof this._flush?this._flush(function(t){done(e,t)}):done(e)})}function done(t,e){if(e)return t.emit("error",e);var n=t._writableState,r=(t._readableState,t._transformState);if(n.length)throw new Error("calling transform done when ws.length != 0");if(r.transforming)throw new Error("calling transform done when still transforming");return t.push(null)}module.exports=Transform;var Duplex=require("./duplex"),inherits=require("npm:inherits@^2.0.1");inherits(Transform,Duplex),Transform.prototype.push=function(t,e){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,t,e)},Transform.prototype._transform=function(){throw new Error("not implemented")},Transform.prototype._write=function(t,e,n){var r=this._transformState;if(r.writecb=n,r.writechunk=t,r.writeencoding=e,!r.transforming){var i=this._readableState;(r.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},Transform.prototype._read=function(){var t=this._transformState;t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0};
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/stream\transform.src.js.map