/*
 * Copyright (C) 2007-2014 Diego Perini
 * All rights reserved.
 *
 * Caching/memoization module for NWMatcher
 *
 * Added capabilities:
 *
 * - Mutation Events are feature tested and used safely
 * - handle caching different document types HTML/XML/SVG
 * - store result sets for different selectors / contexts
 * - simultaneously control mutation on multiple documents
 *
 */
!function(t){var e="object"==typeof exports?exports:(t.NW||(t.NW=t.Object()))&&(t.NW.Dom||(t.NW.Dom=t.Object())),n=t.Object(),r=t.Object(),o=!1,i=!0,a=!1,u=t.document,s=u.documentElement,c=0,l=15,h=function(t,e){var n=!1,r=document.documentElement,o=document.createElement("div"),i=function(){n=!0};return r.insertBefore(o,r.firstChild),o.addEventListener(t,i,!0),e&&e.call&&e(o),o.removeEventListener(t,i,!0),r.removeChild(o),n},f=!1,p=s.addEventListener?h("DOMAttrModified",function(t){t.setAttribute("id","nw")}):!1,d=function(e,u,s){if(o&&!a)if(i)now=(new t.Date).getTime(),l>now-c?(a=i=!0,t.setTimeout(function(){a=!1},l)):E(!0,s),c=now;else if(r[e]&&n[e]===u)return r[e];return void 0},m=function(t,e,o,i){n[t]=e,r[t]=i},g=function(t){var e=t.target.ownerDocument||t.target;v(e),y(e)},_=function(t){!t.isCaching&&t.addEventListener&&(t.addEventListener("DOMAttrModified",g,!0),t.addEventListener("DOMNodeInserted",g,!0),t.addEventListener("DOMNodeRemoved",g,!0),t.isCaching=!0)},v=function(t){t.isCaching&&t.removeEventListener&&(t.removeEventListener("DOMAttrModified",g,!0),t.removeEventListener("DOMNodeInserted",g,!0),t.removeEventListener("DOMNodeRemoved",g,!0),t.isCaching=!1)},E=function(t,e){t?(i=!1,_(e)):(i=!0,v(e)),o=!!t},y=function(){i=!0,n=t.Object(),r=t.Object()};!p&&s.addEventListener&&Element&&Element.prototype&&h("DOMNodeInserted",function(t){t.appendChild(document.createElement("div"))})&&h("DOMNodeRemoved",function(t){t.removeChild(t.appendChild(document.createElement("div")))})&&(f=!0,Element.prototype._setAttribute=Element.prototype.setAttribute,Element.prototype.setAttribute=function(t,e){this._setAttribute(t,e),g({target:this,type:"DOMAttrModified",attrName:t,attrValue:e})}),o=p||f,e.saveResults=m,e.loadResults=d,e.expireCache=y,e.setCache=E}(this);
//# sourceMappingURL=jspm_packages/npm/nwmatcher@1.3.3/src/modules/nwmatcher-cache.js.map