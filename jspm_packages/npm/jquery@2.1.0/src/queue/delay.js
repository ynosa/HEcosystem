define(["../core","../queue","../effects"],function(e){return e.fn.delay=function(t,n){return t=e.fx?e.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(e,n){var r=setTimeout(e,t);n.stop=function(){clearTimeout(r)}})},e.fn.delay});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\queue\delay.js.map