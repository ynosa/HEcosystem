define(["./core","./var/pnum","./css/var/cssExpand","./css/var/isHidden","./css/defaultDisplay","./data/var/data_priv","./core/init","./effects/Tween","./queue","./css","./deferred","./traversing"],function(e,t,n,r,i,o){function s(){return setTimeout(function(){p=void 0}),p=e.now()}function a(e,t){var r,i=0,o={height:e};for(t=t?1:0;4>i;i+=2-t)r=n[i],o["margin"+r]=o["padding"+r]=e;return t&&(o.opacity=o.width=e),o}function u(e,t,n){for(var r,i=(y[t]||[]).concat(y["*"]),o=0,s=i.length;s>o;o++)if(r=i[o].call(n,t,e))return r}function c(t,n,s){var a,c,l,f,p,d,g,m=this,v={},y=t.style,x=t.nodeType&&r(t),b=o.get(t,"fxshow");s.queue||(p=e._queueHooks(t,"fx"),null==p.unqueued&&(p.unqueued=0,d=p.empty.fire,p.empty.fire=function(){p.unqueued||d()}),p.unqueued++,m.always(function(){m.always(function(){p.unqueued--,e.queue(t,"fx").length||p.empty.fire()})})),1===t.nodeType&&("height"in n||"width"in n)&&(s.overflow=[y.overflow,y.overflowX,y.overflowY],g=e.css(t,"display"),"none"===g&&(g=i(t.nodeName)),"inline"===g&&"none"===e.css(t,"float")&&(y.display="inline-block")),s.overflow&&(y.overflow="hidden",m.always(function(){y.overflow=s.overflow[0],y.overflowX=s.overflow[1],y.overflowY=s.overflow[2]}));for(a in n)if(c=n[a],h.exec(c)){if(delete n[a],l=l||"toggle"===c,c===(x?"hide":"show")){if("show"!==c||!b||void 0===b[a])continue;x=!0}v[a]=b&&b[a]||e.style(t,a)}if(!e.isEmptyObject(v)){b?"hidden"in b&&(x=b.hidden):b=o.access(t,"fxshow",{}),l&&(b.hidden=!x),x?e(t).show():m.done(function(){e(t).hide()}),m.done(function(){var n;o.remove(t,"fxshow");for(n in v)e.style(t,n,v[n])});for(a in v)f=u(x?b[a]:0,a,m),a in b||(b[a]=f.start,x&&(f.end=f.start,f.start="width"===a||"height"===a?1:0))}}function l(t,n){var r,i,o,s,a;for(r in t)if(i=e.camelCase(r),o=n[i],s=t[r],e.isArray(s)&&(o=s[1],s=t[r]=s[0]),r!==i&&(t[i]=s,delete t[r]),a=e.cssHooks[i],a&&"expand"in a){s=a.expand(s),delete t[i];for(r in s)r in t||(t[r]=s[r],n[r]=o)}else n[i]=o}function f(t,n,r){var i,o,a=0,c=v.length,f=e.Deferred().always(function(){delete d.elem}),d=function(){if(o)return!1;for(var e=p||s(),n=Math.max(0,h.startTime+h.duration-e),r=n/h.duration||0,i=1-r,a=0,u=h.tweens.length;u>a;a++)h.tweens[a].run(i);return f.notifyWith(t,[h,i,n]),1>i&&u?n:(f.resolveWith(t,[h]),!1)},h=f.promise({elem:t,props:e.extend({},n),opts:e.extend(!0,{specialEasing:{}},r),originalProperties:n,originalOptions:r,startTime:p||s(),duration:r.duration,tweens:[],createTween:function(n,r){var i=e.Tween(t,h.opts,n,r,h.opts.specialEasing[n]||h.opts.easing);return h.tweens.push(i),i},stop:function(e){var n=0,r=e?h.tweens.length:0;if(o)return this;for(o=!0;r>n;n++)h.tweens[n].run(1);return e?f.resolveWith(t,[h,e]):f.rejectWith(t,[h,e]),this}}),g=h.props;for(l(g,h.opts.specialEasing);c>a;a++)if(i=v[a].call(h,t,g,h.opts))return i;return e.map(g,u,h),e.isFunction(h.opts.start)&&h.opts.start.call(t,h),e.fx.timer(e.extend(d,{elem:t,anim:h,queue:h.opts.queue})),h.progress(h.opts.progress).done(h.opts.done,h.opts.complete).fail(h.opts.fail).always(h.opts.always)}var p,d,h=/^(?:toggle|show|hide)$/,g=new RegExp("^(?:([+-])=|)("+t+")([a-z%]*)$","i"),m=/queueHooks$/,v=[c],y={"*":[function(t,n){var r=this.createTween(t,n),i=r.cur(),o=g.exec(n),s=o&&o[3]||(e.cssNumber[t]?"":"px"),a=(e.cssNumber[t]||"px"!==s&&+i)&&g.exec(e.css(r.elem,t)),u=1,c=20;if(a&&a[3]!==s){s=s||a[3],o=o||[],a=+i||1;do u=u||".5",a/=u,e.style(r.elem,t,a+s);while(u!==(u=r.cur()/i)&&1!==u&&--c)}return o&&(a=r.start=+a||+i||0,r.unit=s,r.end=o[1]?a+(o[1]+1)*o[2]:+o[2]),r}]};return e.Animation=e.extend(f,{tweener:function(t,n){e.isFunction(t)?(n=t,t=["*"]):t=t.split(" ");for(var r,i=0,o=t.length;o>i;i++)r=t[i],y[r]=y[r]||[],y[r].unshift(n)},prefilter:function(e,t){t?v.unshift(e):v.push(e)}}),e.speed=function(t,n,r){var i=t&&"object"==typeof t?e.extend({},t):{complete:r||!r&&n||e.isFunction(t)&&t,duration:t,easing:r&&n||n&&!e.isFunction(n)&&n};return i.duration=e.fx.off?0:"number"==typeof i.duration?i.duration:i.duration in e.fx.speeds?e.fx.speeds[i.duration]:e.fx.speeds._default,(null==i.queue||i.queue===!0)&&(i.queue="fx"),i.old=i.complete,i.complete=function(){e.isFunction(i.old)&&i.old.call(this),i.queue&&e.dequeue(this,i.queue)},i},e.fn.extend({fadeTo:function(e,t,n,i){return this.filter(r).css("opacity",0).show().end().animate({opacity:t},e,n,i)},animate:function(t,n,r,i){var s=e.isEmptyObject(t),a=e.speed(n,r,i),u=function(){var n=f(this,e.extend({},t),a);(s||o.get(this,"finish"))&&n.stop(!0)};return u.finish=u,s||a.queue===!1?this.each(u):this.queue(a.queue,u)},stop:function(t,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof t&&(r=n,n=t,t=void 0),n&&t!==!1&&this.queue(t||"fx",[]),this.each(function(){var n=!0,s=null!=t&&t+"queueHooks",a=e.timers,u=o.get(this);if(s)u[s]&&u[s].stop&&i(u[s]);else for(s in u)u[s]&&u[s].stop&&m.test(s)&&i(u[s]);for(s=a.length;s--;)a[s].elem!==this||null!=t&&a[s].queue!==t||(a[s].anim.stop(r),n=!1,a.splice(s,1));(n||!r)&&e.dequeue(this,t)})},finish:function(t){return t!==!1&&(t=t||"fx"),this.each(function(){var n,r=o.get(this),i=r[t+"queue"],s=r[t+"queueHooks"],a=e.timers,u=i?i.length:0;for(r.finish=!0,e.queue(this,t,[]),s&&s.stop&&s.stop.call(this,!0),n=a.length;n--;)a[n].elem===this&&a[n].queue===t&&(a[n].anim.stop(!0),a.splice(n,1));for(n=0;u>n;n++)i[n]&&i[n].finish&&i[n].finish.call(this);delete r.finish})}}),e.each(["toggle","show","hide"],function(t,n){var r=e.fn[n];e.fn[n]=function(e,t,i){return null==e||"boolean"==typeof e?r.apply(this,arguments):this.animate(a(n,!0),e,t,i)}}),e.each({slideDown:a("show"),slideUp:a("hide"),slideToggle:a("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,n){e.fn[t]=function(e,t,r){return this.animate(n,e,t,r)}}),e.timers=[],e.fx.tick=function(){var t,n=0,r=e.timers;for(p=e.now();n<r.length;n++)t=r[n],t()||r[n]!==t||r.splice(n--,1);r.length||e.fx.stop(),p=void 0},e.fx.timer=function(t){e.timers.push(t),t()?e.fx.start():e.timers.pop()},e.fx.interval=13,e.fx.start=function(){d||(d=setInterval(e.fx.tick,e.fx.interval))},e.fx.stop=function(){clearInterval(d),d=null},e.fx.speeds={slow:600,fast:200,_default:400},e});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\effects.js.map