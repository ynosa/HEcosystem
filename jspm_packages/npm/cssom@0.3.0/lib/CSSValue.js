//.CommonJS
var CSSOM={};CSSOM.CSSValue=function(){},CSSOM.CSSValue.prototype={constructor:CSSOM.CSSValue,set cssText(e){var t=this._getConstructorName();throw new Exception('DOMException: property "cssText" of "'+t+'" is readonly!')},get cssText(){var e=this._getConstructorName();throw new Exception('getter "cssText" of "'+e+'" is not implemented!')},_getConstructorName:function(){var e=this.constructor.toString(),t=e.match(/function\s([^\(]+)/),r=t[1];return r}},exports.CSSValue=CSSOM.CSSValue;
//# sourceMappingURL=jspm_packages\npm\cssom@0.3.0/lib\CSSValue.js.map