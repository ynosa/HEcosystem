define(["../core","../var/support"],function(e,t){return function(){function n(){u.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",s.appendChild(a);var e=window.getComputedStyle(u,null);r="1%"!==e.top,i="4px"===e.width,s.removeChild(a)}var r,i,o="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",s=document.documentElement,a=document.createElement("div"),u=document.createElement("div");u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===u.style.backgroundClip,a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(u),window.getComputedStyle&&e.extend(t,{pixelPosition:function(){return n(),r},boxSizingReliable:function(){return null==i&&n(),i},reliableMarginRight:function(){var e,t=u.appendChild(document.createElement("div"));return t.style.cssText=u.style.cssText=o,t.style.marginRight=t.style.width="0",u.style.width="1px",s.appendChild(a),e=!parseFloat(window.getComputedStyle(t,null).marginRight),s.removeChild(a),u.innerHTML="",e}})}(),t});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\css\support.js.map