define(["../var/support"],function(e){return function(){var t=document.createDocumentFragment(),n=t.appendChild(document.createElement("div"));n.innerHTML="<input type='radio' checked='checked' name='t'/>",e.checkClone=n.cloneNode(!0).cloneNode(!0).lastChild.checked,n.innerHTML="<textarea>x</textarea>",e.noCloneChecked=!!n.cloneNode(!0).lastChild.defaultValue}(),e});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\manipulation\support.js.map