/**
 * Intercepts a method by replacing the prototype's implementation
 * with a wrapper that invokes the given interceptor instead.
 * 
 *     utils.intercept(core.Element, 'inserBefore',
 *       function(_super, args, newChild, refChild) {
 *         console.log('insertBefore', newChild, refChild);
 *         return _super.apply(this, args);
 *       }
 *     );
 */
exports.intercept=function(t,e,n){var r=t.prototype,o=r[e],i=n.length>2;r[e]=function(){if(i){var t=Array.prototype.slice.call(arguments);return t.unshift(o,arguments),n.apply(this,t)}return n.call(this,o,arguments)}};
//# sourceMappingURL=jspm_packages/npm/jsdom@0.5.7/utils.js.map