function bindings(t){"string"==typeof t?t={bindings:t}:t||(t={}),t.__proto__=defaults,t.module_root||(t.module_root=exports.getRoot(exports.getFileName())),".node"!=path.extname(t.bindings)&&(t.bindings+=".node");for(var e,r,n,i=[],o=0,a=t.try.length;a>o;o++){e=join.apply(null,t.try[o].map(function(e){return t[e]||e})),i.push(e);try{return r=t.path?require.resolve(e):require(e),t.path||(r.path=e),r}catch(s){if(!/not find/i.test(s.message))throw s}}throw n=new Error("Could not locate the bindings file. Tried:\n"+i.map(function(e){return t.arrow+e}).join("\n")),n.tries=i,n}var fs=require("github:jspm/nodelibs@0.0.2/fs"),path=require("github:jspm/nodelibs@0.0.2/path"),join=path.join,dirname=path.dirname,exists=fs.existsSync||path.existsSync,defaults={arrow:process.env.NODE_BINDINGS_ARROW||" → ",compiled:process.env.NODE_BINDINGS_COMPILED_DIR||"compiled",platform:process.platform,arch:process.arch,version:process.versions.node,bindings:"bindings.node","try":[["module_root","build","bindings"],["module_root","build","Debug","bindings"],["module_root","build","Release","bindings"],["module_root","out","Debug","bindings"],["module_root","Debug","bindings"],["module_root","out","Release","bindings"],["module_root","Release","bindings"],["module_root","build","default","bindings"],["module_root","compiled","version","platform","arch","bindings"]]};module.exports=exports=bindings,exports.getFileName=function(t){var e,r=Error.prepareStackTrace,n=Error.stackTraceLimit,i={};return Error.stackTraceLimit=10,Error.prepareStackTrace=function(r,n){for(var i=0,o=n.length;o>i;i++)if(e=n[i].getFileName(),e!==__filename){if(!t)return;if(e!==t)return}},Error.captureStackTrace(i),i.stack,Error.prepareStackTrace=r,Error.stackTraceLimit=n,e},exports.getRoot=function(t){for(var e,r=dirname(t);;){if("."===r&&(r=process.cwd()),exists(join(r,"package.json"))||exists(join(r,"node_modules")))return r;if(e===r)throw new Error('Could not find module root given file: "'+t+'". Do you have a `package.json` file? ');e=r,r=join(r,"..")}};
//# sourceMappingURL=jspm_packages\npm\bindings@1.2.0/bindings.js.map