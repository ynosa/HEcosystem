define(["../core","./support","../core/init"],function(e,t){var n=/\r/g;e.fn.extend({val:function(t){var r,i,o,s=this[0];{if(arguments.length)return o=e.isFunction(t),this.each(function(n){var i;1===this.nodeType&&(i=o?t.call(this,n,e(this).val()):t,null==i?i="":"number"==typeof i?i+="":e.isArray(i)&&(i=e.map(i,function(e){return null==e?"":e+""})),r=e.valHooks[this.type]||e.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&void 0!==r.set(this,i,"value")||(this.value=i))});if(s)return r=e.valHooks[s.type]||e.valHooks[s.nodeName.toLowerCase()],r&&"get"in r&&void 0!==(i=r.get(s,"value"))?i:(i=s.value,"string"==typeof i?i.replace(n,""):null==i?"":i)}}}),e.extend({valHooks:{select:{get:function(n){for(var r,i,o=n.options,s=n.selectedIndex,a="select-one"===n.type||0>s,u=a?null:[],c=a?s+1:o.length,l=0>s?c:a?s:0;c>l;l++)if(i=o[l],!(!i.selected&&l!==s||(t.optDisabled?i.disabled:null!==i.getAttribute("disabled"))||i.parentNode.disabled&&e.nodeName(i.parentNode,"optgroup"))){if(r=e(i).val(),a)return r;u.push(r)}return u},set:function(t,n){for(var r,i,o=t.options,s=e.makeArray(n),a=o.length;a--;)i=o[a],(i.selected=e.inArray(e(i).val(),s)>=0)&&(r=!0);return r||(t.selectedIndex=-1),s}}}}),e.each(["radio","checkbox"],function(){e.valHooks[this]={set:function(t,n){return e.isArray(n)?t.checked=e.inArray(e(t).val(),n)>=0:void 0}},t.checkOn||(e.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})})});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\attributes\val.js.map