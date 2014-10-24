define(["./core","./var/indexOf","./traversing/var/rneedsContext","./core/init","./traversing/findFilter","./selector"],function(e,t,n){function r(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}var i=/^(?:parents|prev(?:Until|All))/,o={children:!0,contents:!0,next:!0,prev:!0};return e.extend({dir:function(t,n,r){for(var i=[],o=void 0!==r;(t=t[n])&&9!==t.nodeType;)if(1===t.nodeType){if(o&&e(t).is(r))break;i.push(t)}return i},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}}),e.fn.extend({has:function(t){var n=e(t,this),r=n.length;return this.filter(function(){for(var t=0;r>t;t++)if(e.contains(this,n[t]))return!0})},closest:function(t,r){for(var i,o=0,a=this.length,s=[],u=n.test(t)||"string"!=typeof t?e(t,r||this.context):0;a>o;o++)for(i=this[o];i&&i!==r;i=i.parentNode)if(i.nodeType<11&&(u?u.index(i)>-1:1===i.nodeType&&e.find.matchesSelector(i,t))){s.push(i);break}return this.pushStack(s.length>1?e.unique(s):s)},index:function(n){return n?"string"==typeof n?t.call(e(n),this[0]):t.call(this,n.jquery?n[0]:n):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,n){return this.pushStack(e.unique(e.merge(this.get(),e(t,n))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),e.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(t){return e.dir(t,"parentNode")},parentsUntil:function(t,n,r){return e.dir(t,"parentNode",r)},next:function(e){return r(e,"nextSibling")},prev:function(e){return r(e,"previousSibling")},nextAll:function(t){return e.dir(t,"nextSibling")},prevAll:function(t){return e.dir(t,"previousSibling")},nextUntil:function(t,n,r){return e.dir(t,"nextSibling",r)},prevUntil:function(t,n,r){return e.dir(t,"previousSibling",r)},siblings:function(t){return e.sibling((t.parentNode||{}).firstChild,t)},children:function(t){return e.sibling(t.firstChild)},contents:function(t){return t.contentDocument||e.merge([],t.childNodes)}},function(t,n){e.fn[t]=function(r,a){var s=e.map(this,n,r);return"Until"!==t.slice(-5)&&(a=r),a&&"string"==typeof a&&(s=e.filter(a,s)),this.length>1&&(o[t]||e.unique(s),i.test(t)&&s.reverse()),this.pushStack(s)}}),e});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\traversing.js.map