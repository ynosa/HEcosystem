//.CommonJS
var CSSOM={};CSSOM.MediaList=function(){this.length=0},CSSOM.MediaList.prototype={constructor:CSSOM.MediaList,get mediaText(){return Array.prototype.join.call(this,", ")},set mediaText(e){for(var t=e.split(","),r=this.length=t.length,n=0;r>n;n++)this[n]=t[n].trim()},appendMedium:function(e){-1===Array.prototype.indexOf.call(this,e)&&(this[this.length]=e,this.length++)},deleteMedium:function(e){var t=Array.prototype.indexOf.call(this,e);-1!==t&&Array.prototype.splice.call(this,t,1)}},exports.MediaList=CSSOM.MediaList;
//# sourceMappingURL=jspm_packages\npm\cssom@0.3.0/lib\MediaList.js.map