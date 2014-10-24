var core=require("../level2/core").dom.level2.core,HtmlToDom=require("../browser/htmltodom").HtmlToDom,domToHtml=require("../browser/domtohtml").domToHtml,htmlencoding=require("../browser/htmlencoding"),HTMLEncode=htmlencoding.HTMLEncode,HTMLDecode=htmlencoding.HTMLDecode;core=Object.create(core),core.VALIDATION_ERR=16,core.TYPE_MISMATCH_ERR=17,core.DOMImplementation.prototype.getFeature=function(){};var DOCUMENT_POSITION_DISCONNECTED=core.Node.prototype.DOCUMENT_POSITION_DISCONNECTED=1,DOCUMENT_POSITION_PRECEDING=core.Node.prototype.DOCUMENT_POSITION_PRECEDING=2,DOCUMENT_POSITION_FOLLOWING=core.Node.prototype.DOCUMENT_POSITION_FOLLOWING=4,DOCUMENT_POSITION_CONTAINS=core.Node.prototype.DOCUMENT_POSITION_CONTAINS=8,DOCUMENT_POSITION_CONTAINED_BY=core.Node.prototype.DOCUMENT_POSITION_CONTAINED_BY=16,DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC=core.Node.prototype.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC=32,DOCUMENT_TYPE_NODE=core.Node.prototype.DOCUMENT_TYPE_NODE;core.Node.prototype.compareDocumentPosition=function(t){if(!(t instanceof core.Node))throw Error("Comparing position against non-Node values is not allowed");var e,n;if(e=this.nodeType===this.DOCUMENT_NODE?this:this.ownerDocument,n=t.nodeType===this.DOCUMENT_NODE?t:t.ownerDocument,this===t)return 0;if(this===t.ownerDocument)return DOCUMENT_POSITION_FOLLOWING+DOCUMENT_POSITION_CONTAINED_BY;if(this.ownerDocument===t)return DOCUMENT_POSITION_PRECEDING+DOCUMENT_POSITION_CONTAINS;if(e!==n)return DOCUMENT_POSITION_DISCONNECTED;if(this.nodeType===this.ATTRIBUTE_NODE&&this._childNodes&&-1!==this._childNodes._toArray().indexOf(t))return DOCUMENT_POSITION_FOLLOWING+DOCUMENT_POSITION_CONTAINED_BY;if(t.nodeType===this.ATTRIBUTE_NODE&&t._childNodes&&-1!==t._childNodes._toArray().indexOf(this))return DOCUMENT_POSITION_PRECEDING+DOCUMENT_POSITION_CONTAINS;for(var r=this,o=[],i=null;r;){if(r==t)return DOCUMENT_POSITION_PRECEDING+DOCUMENT_POSITION_CONTAINS;o.push(r),r=r._parentNode}for(r=t,i=null;r;){if(r==this)return DOCUMENT_POSITION_FOLLOWING+DOCUMENT_POSITION_CONTAINED_BY;var a=o.indexOf(r);if(-1!==a){var u=o[a],c=u._childNodes._toArray().indexOf(o[a-1]),s=u._childNodes._toArray().indexOf(i);return c>s?DOCUMENT_POSITION_PRECEDING:DOCUMENT_POSITION_FOLLOWING}i=r,r=r._parentNode}return DOCUMENT_POSITION_DISCONNECTED},core.Node.prototype.isSameNode=function(t){return t===this},core.Node.prototype.__defineGetter__("textContent",function(){switch(this.nodeType){case this.COMMENT_NODE:case this.CDATA_SECTION_NODE:case this.PROCESSING_INSTRUCTION_NODE:case this.TEXT_NODE:return this.nodeValue;case this.ATTRIBUTE_NODE:case this.DOCUMENT_FRAGMENT_NODE:case this.ELEMENT_NODE:case this.ENTITY_NODE:case this.ENTITY_REFERENCE_NODE:for(var t="",e=0;e<this.childNodes.length;++e)this.childNodes[e].nodeType!==this.COMMENT_NODE&&this.childNodes[e].nodeType!==this.PROCESSING_INSTRUCTION_NODE&&(t+=this.childNodes[e].textContent||"");return t;default:return null}}),core.Node.prototype.__defineSetter__("textContent",function(t){for(var e=this.childNodes.length;--e>=0;)this.removeChild(this.childNodes.item(e));return""!==t&&null!=t&&this.appendChild(this._ownerDocument.createTextNode(t)),t}),core.Node.prototype.isEqualNode=function(t){var e=this,n=function(){for(var n=0;n<arguments.length;n++){var r=arguments[n];if(e[r]!=t[r])return!0}return!1},r=function(t,e){if(null==t&&null==e)return!1;if(null==t||null==e)return!0;if(t.length!=e.length)return!0;for(var n=[],r=0;r<e.length;r++)n[r]=r;for(var o=0;o<t.length;o++){for(var i=!1,r=0;r<n.length;r++)if(t.item(o).isEqualNode(e.item(n[r]))){i=!0,n.splice(r,1);break}if(!i)return!0}return!1},o=function(t,e){if(null==t&&null==e)return!1;if(null==t||null==e)return!0;if(t.length!=e.length)return!0;for(var n=0;n<t.length;n++)if(!t.item(n).isEqualNode(e.item(n)))return!0;return!1};if(!t)return!1;if(this.isSameNode(t))return!0;if(this.nodeType!=t.nodeType)return!1;if(n("nodeName","localName","namespaceURI","prefix","nodeValue"))return!1;if(r(this.attributes,t.attributes))return!1;if(o(this.childNodes,t.childNodes))return!1;if(this.nodeType==DOCUMENT_TYPE_NODE){if(n("publicId","systemId","internalSubset"))return!1;if(r(this.entities,t.entities))return!1;if(r(this.notations,t.notations))return!1}return!0},core.Node.prototype.setUserData=function(t,e){var n=this[t]||null;return this[t]=e,n},core.Node.prototype.getUserData=function(t){var e=this[t]||null;return e},core.Attr.prototype.__defineGetter__("isId",function(){return"id"===this.name.toLowerCase()}),core.UserDataHandler=function(){},core.UserDataHandler.prototype.NODE_CLONED=1,core.UserDataHandler.prototype.NODE_IMPORTED=2,core.UserDataHandler.prototype.NODE_DELETED=3,core.UserDataHandler.prototype.NODE_RENAMED=4,core.UserDataHandler.prototype.NODE_ADOPTED=5,core.UserDataHandler.prototype.handle=function(){},core.DOMError=function(t,e,n,r,o,i){this._severity=t,this._message=e,this._type=n,this._relatedException=r,this._relatedData=o,this._location=i},core.DOMError.prototype={},core.DOMError.prototype.SEVERITY_WARNING=1,core.DOMError.prototype.SEVERITY_ERROR=2,core.DOMError.prototype.SEVERITY_FATAL_ERROR=3,core.DOMError.prototype.__defineGetter__("severity",function(){return this._severity}),core.DOMError.prototype.__defineGetter__("message",function(){return this._message}),core.DOMError.prototype.__defineGetter__("type",function(){return this._type}),core.DOMError.prototype.__defineGetter__("relatedException",function(){return this._relatedException}),core.DOMError.prototype.__defineGetter__("relatedData",function(){return this._relatedData}),core.DOMError.prototype.__defineGetter__("location",function(){return this._location}),core.DOMConfiguration=function(){},core.DOMConfiguration.prototype={setParameter:function(){},getParameter:function(){},canSetParameter:function(){},parameterNames:function(){}},core.Document.prototype.__defineGetter__("domConfig",function(){return this._domConfig||new core.DOMConfiguration}),core.DOMStringList=function(){},core.DOMStringList.prototype={item:function(){},length:function(){},contains:function(){}},core.Document.prototype._inputEncoding=null,core.Document.prototype.__defineGetter__("inputEncoding",function(){return this._inputEncoding}),exports.dom={level3:{core:core}};
//# sourceMappingURL=jspm_packages/npm/jsdom@0.5.7/level3/core.js.map