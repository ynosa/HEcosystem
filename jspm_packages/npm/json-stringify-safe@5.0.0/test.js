function prune(){}function recycle(e,t){return t}function signer(e,t){var n=e+"{",r=!1;for(var o in t){r&&(n+=","),r=!0,n+=o+":";var i=t[o];switch(typeof i){case"object":n+=i?Array.isArray(i)?"Array":i.constructor&&i.constructor.name||"Object":"null";break;default:n+=typeof i}}return n+="}"}var stringify=require("./stringify"),circularObj={a:"b"};circularObj.circularRef=circularObj,circularObj.list=[circularObj,circularObj];var testObj={a:"b",circularRef:"[Circular ~]",list:["[Circular ~]","[Circular ~]"]},assert=require("github:jspm/nodelibs@0.0.2/assert");assert.equal(JSON.stringify(testObj,null,2),stringify(circularObj,null,2)),assert.equal(JSON.stringify(testObj,null,2),JSON.stringify(circularObj,stringify.getSerialize(),2)),testObj={a:"b",list:[null,null]},assert.equal(JSON.stringify(testObj,null,2),stringify(circularObj,null,2,prune)),assert.throws(function(){stringify(circularObj,null,2,recycle)}),testObj={a:"b",circularRef:"circularRef{a:string,circularRef:Object,list:Array}",list:["0{a:string,circularRef:Object,list:Array}","1{a:string,circularRef:Object,list:Array}"]},assert.equal(JSON.stringify(testObj,null,2),stringify(circularObj,null,2,signer));var a={x:1};a.a=a;var b={x:2};b.a=a;var c={a:a,b:b},d={list:[a,b,c]};d.d=d;var multi={list:[{x:1,a:"[Circular ~.list.0]"},{x:2,a:"[Circular ~.list.0]"},{a:"[Circular ~.list.0]",b:"[Circular ~.list.1]"}],d:"[Circular ~]"};assert.equal(JSON.stringify(multi,null,2),stringify(d,null,2)),console.log("ok");
//# sourceMappingURL=jspm_packages/npm/json-stringify-safe@5.0.0/test.js.map