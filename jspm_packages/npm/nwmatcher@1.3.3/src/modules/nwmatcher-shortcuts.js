NW.Dom.shortcuts=function(){var t=0,e=/^[\x20\t\n\r\f]*[>+~]/,n=/[>+~][\x20\t\n\r\f]*$/;return function(r,o,i){return e.test(r)&&(9==o.nodeType?r="* "+r:/html|body/i.test(o.nodeName)?r=o.nodeName+" "+r:i?r=NW.Dom.shortcuts(r,i):1==o.nodeType&&o.id?r="#"+o.id+" "+r:(++t,r="#"+(o.id="NW"+t)+" "+r)),n.test(r)&&(r+=" *"),r}}();
//# sourceMappingURL=jspm_packages/npm/nwmatcher@1.3.3/src/modules/nwmatcher-shortcuts.js.map