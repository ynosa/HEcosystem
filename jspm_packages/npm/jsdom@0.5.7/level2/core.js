var core=require("../level1/core").dom.level1.core;core=Object.create(core);var INVALID_STATE_ERR=core.INVALID_STATE_ERR=11,SYNTAX_ERR=core.SYNTAX_ERR=12,INVALID_MODIFICATION_ERR=core.INVALID_MODIFICATION_ERR=13,NAMESPACE_ERR=core.NAMESPACE_ERR=14,INVALID_ACCESS_ERR=core.INVALID_ACCESS_ERR=15,ns={validate:function(t,e){if(!t)throw new core.DOMException(core.INVALID_CHARACTER_ERR,"namespace is undefined");if(null!==t.match(/[^0-9a-z\.:\-_]/i))throw new core.DOMException(core.INVALID_CHARACTER_ERR,t);var n=!1,r=t.split(":");if("xmlns"===t&&"http://www.w3.org/2000/xmlns/"!==e?n="localName is 'xmlns' but the namespaceURI is invalid":"xml"===t&&"http://www.w3.org/XML/1998/namespace"!==e?n="localName is 'xml' but the namespaceURI is invalid":":"===t[t.length-1]?n="Namespace seperator found with no localName":":"===t[0]?n="Namespace seperator found, without a prefix":r.length>2&&(n="Too many namespace seperators"),n)throw new core.DOMException(NAMESPACE_ERR,n+" ("+t+"@"+e+")")}};core.exceptionMessages.NAMESPACE_ERR="Invalid namespace",core.DOMImplementation.prototype.createDocumentType=function(t,e,n){ns.validate(t);var r=new core.DocumentType(null,t);return r._publicId=e?e:"",r._systemId=n?n:"",r},core.DOMImplementation.prototype.createDocument=function(t,e,n){if((e||t)&&ns.validate(e,t),n&&null!==n._ownerDocument)throw new core.DOMException(core.WRONG_DOCUMENT_ERR);if(e&&e.indexOf(":")>-1&&!t)throw new core.DOMException(NAMESPACE_ERR);var r=new core.Document;if(n?(r.doctype=n,n._ownerDocument=r,r.appendChild(n)):r.doctype=null,n&&!n.entities&&(n.entities=new core.EntityNodeMap),r._ownerDocument=r,e){var o=r.createElementNS(t,e);r.appendChild(o)}return r},core.Node.prototype.__defineGetter__("ownerDocument",function(){return this._ownerDocument||null}),core.Node.prototype.isSupported=function(t,e){return this._ownerDocument.implementation.hasFeature(t,e)},core.Node.prototype._namespaceURI=null,core.Node.prototype.__defineGetter__("namespaceURI",function(){return this._namespaceURI||null}),core.Node.prototype.__defineSetter__("namespaceURI",function(t){this._namespaceURI=t}),core.Node.prototype.__defineGetter__("prefix",function(){return this._prefix||null}),core.Node.prototype.__defineSetter__("prefix",function(t){if(this.readonly)throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);if(ns.validate(t,this._namespaceURI),this._created&&!this._namespaceURI||"xmlns"===this._prefix||!this._prefix&&this._created)throw new core.DOMException(core.NAMESPACE_ERR);this._localName&&(this._nodeName=t+":"+this._localName),this._prefix=t}),core.Node.prototype.__defineGetter__("localName",function(){return this._localName||null}),core.Node.prototype.hasAttributes=function(){return this.nodeType===this.ELEMENT_NODE&&this._attributes&&this._attributes.length>0},core.NamedNodeMap.prototype.getNamedItemNS=function(t,e){return this._nsStore[t]&&this._nsStore[t][e]?this._nsStore[t][e]:null},core.AttrNodeMap.prototype.setNamedItemNS=function(t){if(t.nodeType!==this._ownerDocument.ATTRIBUTE_NODE)throw new core.DOMException(core.HIERARCHY_REQUEST_ERR);return core.NamedNodeMap.prototype.setNamedItemNS.call(this,t)};var prevSetNamedItem=core.AttrNodeMap.prototype.setNamedItem;core.AttrNodeMap.prototype.setNamedItem=function(t){if(t.nodeType!==this._ownerDocument.ATTRIBUTE_NODE)throw new core.DOMException(core.HIERARCHY_REQUEST_ERR);return prevSetNamedItem.call(this,t)},core.NamedNodeMap.prototype.setNamedItemNS=function(t){if(this._readonly)throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);var e=this._ownerDocument;if(this._parentNode&&this._parentNode._parentNode&&this._parentNode._parentNode.nodeType===e.ENTITY_NODE)throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);if(this._ownerDocument!==t.ownerDocument)throw new core.DOMException(core.WRONG_DOCUMENT_ERR);if(t._ownerElement)throw new core.DOMException(core.INUSE_ATTRIBUTE_ERR);if(this._readonly===!0)throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);this._nsStore[t.namespaceURI]||(this._nsStore[t.namespaceURI]={});if(this._nsStore[t.namespaceURI][t.localName]){this._nsStore[t.namespaceURI][t.localName]}return this._nsStore[t.namespaceURI][t.localName]=t,t._specified=!0,t._ownerDocument=this._ownerDocument,this.setNamedItem(t)},core.NamedNodeMap.prototype.removeNamedItemNS=function(t,e){if(this.readonly)throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);var n,r,o,i,a=this._parentNode,u=null;if(this._parentNode&&this._parentNode._parentNode&&this._parentNode._parentNode.nodeType===this._ownerDocument.ENTITY_NODE)throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);if(this._nsStore[t]&&this._nsStore[t][e]&&(u=this._nsStore[t][e],this.removeNamedItem(u.qualifiedName),delete this._nsStore[t][e]),!u)throw new core.DOMException(core.NOT_FOUND_ERR);return a.ownerDocument.doctype&&a.ownerDocument.doctype._attributes&&(n=a.ownerDocument.doctype._attributes,o=n.getNamedItemNS(a._namespaceURI,a._localName)),o&&(i=o._attributes.getNamedItemNS(t,e),i&&(r=i.cloneNode(!0),r._created=!1,r._namespaceURI=u._namespaceURI,r._nodeName=u.name,r._localName=u._localName,r._prefix=u._prefix,this.setNamedItemNS(r),r._created=!0,r._specified=!1)),u},core.Attr.prototype.__defineGetter__("ownerElement",function(){return this._ownerElement||null}),core.Node.prototype._prefix=!1,core.Node.prototype.__defineSetter__("qualifiedName",function(t){ns.validate(t,this._namespaceURI),t=t||"",this._localName=t.split(":")[1]||null,this.prefix=t.split(":")[0]||null,this._nodeName=t}),core.Node.prototype.__defineGetter__("qualifiedName",function(){return this._nodeName}),core.NamedNodeMap.prototype._map=function(t){var e,n=[],r=this.length,o=0;for(o;r>o;o++)e=this.item(o),t&&t(e)&&n.push(e);return n},core.Element.prototype.getAttributeNS=function(t,e){var n=this._attributes.getNamedItemNS(t,e);return n&&n.nodeValue},core.Element.prototype.setAttributeNS=function(t,e,n){var r,o=e.split(":"),i=o.pop(),a=o.pop()||null;if(ns.validate(e,t),"xml"===e.split(":").shift()&&"http://www.w3.org/XML/1998/namespace"!==t)throw new core.DOMException(core.NAMESPACE_ERR);if("xmlns"===a&&"http://www.w3.org/2000/xmlns/"!==t)throw new core.DOMException(core.NAMESPACE_ERR);if(e.split(":").length>1&&!t)throw new core.DOMException(core.NAMESPACE_ERR);r=this._attributes.getNamedItemNS(t,i),r||(r=this.ownerDocument.createAttributeNS(t,e,n),this._attributes.setNamedItemNS(r)),r._namespaceURI=t,r._prefix=a,r._created=!0,r.value=n,r._localName=i},core.Element.prototype.removeAttributeNS=function(t,e){if(this.readonly)throw new core.DOMException(core.NO_MODIFICATION_ALLOWED_ERR);var n,r,o,i,r,e,a=this.ownerDocument;a.doctype&&a.doctype._attributes&&(n=a.doctype._attributes,o=n.getNamedItemNS(t,this.localName)),o&&(i=o.getAttributeNodeNS(t,e)),this._attributes.removeNamedItemNS(t,e),i&&(this.setAttributeNS(i.namespaceURI,i.name,i.value),e=i.name.split(":").pop(),r=this.getAttributeNS(i.namespaceURI,e),r._specified=!1)},core.Element.prototype.getAttributeNodeNS=function(t,e){return this._attributes.getNamedItemNS(t,e)},core.Element.prototype._created=!1,core.Element.prototype.setAttributeNodeNS=function(t){if(t.ownerElement)throw new core.DOMException(core.INUSE_ATTRIBUTE_ERR);var e=null;try{e=this._attributes.removeNamedItemNS(t.namespaceURI,t.localName)}catch(n){}return this._attributes.setNamedItemNS(t)||e},core.Element.prototype.getElementsByTagNameNS=function(t,e){function n(n){n.nodeType&&n.nodeType===this.ENTITY_REFERENCE_NODE&&(n=n._entity);var r=n.localName===e,o=n.namespaceURI===t;return!r&&"*"!==e||!o&&"*"!==t||n.nodeType!==n.ELEMENT_NODE?!1:!0}return new core.NodeList(this.ownerDocument||this,core.mapper(this,n))},core.Element.prototype.hasAttribute=function(t){return this._attributes?this._attributes.exists(t):!1},core.Element.prototype.hasAttributeNS=function(t,e){return this._attributes.getNamedItemNS(t,e)?!0:this.hasAttribute(e)?!0:!1},core.DocumentType.prototype.__defineGetter__("publicId",function(){return this._publicId||""}),core.DocumentType.prototype.__defineGetter__("systemId",function(){return this._systemId||""}),core.DocumentType.prototype.__defineGetter__("internalSubset",function(){return this._internalSubset||null}),core.Document.prototype.importNode=function(t,e){function n(t){var e,n;if(t._ownerDocument=r,t.id&&(r._ids||(r._ids={}),r._ids[t.id]||(r._ids[t.id]=[]),r._ids[t.id].push(t)),t._attributes){t._attributes._ownerDocument=r;for(var o=0,a=t._attributes.length;a>o;o++)e=t._attributes.item(o),e._ownerDocument=r,e._specified=!0}i&&(n=i.getNamedItemNS(t._namespaceURI,t._localName),n&&n._attributes._map(function(e){if(!t.hasAttributeNS(e.namespaceURL,e.localName)){var n=e.cloneNode(!0);n._namespaceURI=e._namespaceURI,n._prefix=e._prefix,n._localName=e._localName,t.setAttributeNodeNS(n),n._specified=!1}}))}if(t&&t.nodeType&&(t.nodeType===this.DOCUMENT_NODE||t.nodeType===this.DOCUMENT_TYPE_NODE))throw new core.DOMException(core.NOT_SUPPORTED_ERR);var r=this,o=t.cloneNode(e,function(t,e){e._namespaceURI=t._namespaceURI,e._nodeName=t._nodeName,e._localName=t._localName}),i=!1;return this.doctype&&this.doctype._attributes&&(i=this.doctype._attributes),e?core.visitTree(o,n):n(o),o.nodeType==o.ATTRIBUTE_NODE&&(o._specified=!0),o},core.Document.prototype.createElementNS=function(t,e){var n,r,o=e.split(":");if(o.length>1&&!t)throw new core.DOMException(core.NAMESPACE_ERR);return ns.validate(e,t),n=this.createElement(e),n._created=!1,n._namespaceURI=t,n._nodeName=e,n._localName=o.pop(),o.length>0&&(r=o.pop(),n.prefix=r),n._created=!0,n},core.Document.prototype.createAttributeNS=function(t,e){var n,r=e.split(":");if(r.length>1&&!t)throw new core.DOMException(core.NAMESPACE_ERR,"Prefix specified without namespaceURI ("+e+")");return ns.validate(e,t),n=this.createAttribute(e),n.namespaceURI=t,n.qualifiedName=e,n._localName=r.pop(),n._prefix=r.length>0?r.pop():null,n},core.Document.prototype.getElementsByTagNameNS=function(t,e){return core.Element.prototype.getElementsByTagNameNS.call(this,t,e)},core.Element.prototype.__defineSetter__("id",function(t){this.setAttribute("id",t)}),core.Element.prototype.__defineGetter__("id",function(){return this.getAttribute("id")}),core.Document.prototype.getElementById=function(t){return this._ids&&this._ids[t]&&this._ids[t].length>0?this._ids[t][0]:null},exports.dom={level2:{core:core}};
//# sourceMappingURL=jspm_packages/npm/jsdom@0.5.7/level2/core.js.map