/*global define:false require:false */
module.exports=function(){var t=require("./events"),n={};return n.create=function(){var n=new t.EventEmitter;return n.run=function(t){try{t()}catch(n){this.emit("error",n)}return this},n.dispose=function(){return this.removeAllListeners(),this},n},n}.call(this);
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/domain.js.map