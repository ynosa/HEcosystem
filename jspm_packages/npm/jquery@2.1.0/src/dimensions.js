define(["./core","./core/access","./css"],function(e,t){return e.each({Height:"height",Width:"width"},function(n,r){e.each({padding:"inner"+n,content:r,"":"outer"+n},function(i,o){e.fn[o]=function(o,s){var a=arguments.length&&(i||"boolean"!=typeof o),u=i||(o===!0||s===!0?"margin":"border");return t(this,function(t,r,i){var o;return e.isWindow(t)?t.document.documentElement["client"+n]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+n],o["scroll"+n],t.body["offset"+n],o["offset"+n],o["client"+n])):void 0===i?e.css(t,r,u):e.style(t,r,i,u)},r,a?o:void 0,a,null)}})}),e});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\dimensions.js.map