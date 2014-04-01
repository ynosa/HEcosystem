/*
 * Element Traversal methods from Juriy Zaytsev (kangax)
 * used to emulate Prototype up/down/previous/next methods
 */
!function(t){function e(t,e,n){var r=0,o="number"==typeof n;for("undefined"==typeof n&&(o=!0,n=0);e=e[t];)if(1==e.nodeType)if(o){if(++r,r==n)return e}else if(a(e,n))return e;return null}function n(t,n){return e(h,t,n)}function r(t,n){return e(c,t,n)}function o(t,n){return e(l,t,n)}function i(t,e){var n,r,o,i="number"==typeof e;if(null===e){for(t=t.firstChild;t&&1!=t.nodeType;)t=t[c];return t}if(!i&&a(t,e)||i&&0===e)return t;if(n=u("*",t),i)return n[e]||null;for(r=0;(o=n[r])&&!a(o,e);)++r;return o||null}var a=t.match,u=t.select,s=document.documentElement,c="nextElementSibling",l="previousElementSibling",h="parentElement";c in s||(c="nextSibling"),l in s||(l="previousSibling"),h in s||(h="parentNode"),t.up=n,t.down=i,t.next=r,t.previous=o}(NW.Dom);
//# sourceMappingURL=jspm_packages/npm/nwmatcher@1.3.3/src/modules/nwmatcher-traversal.js.map