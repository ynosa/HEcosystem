"use strict";var parsers=require("../parsers"),parse=function(t){var e=parsers.parseColor(t);return void 0!==e?e:parsers.valueType(t)!==parsers.TYPES.KEYWORD||"transparent"!==t.toLowerCase()&&"inherit"!==t.toLowerCase()?void 0:t};module.exports.isValid=function(t){return void 0!==parse(t)},module.exports.definition={set:function(t){var e=parse(t);void 0!==e&&this.setProperty("background-color",e)},get:function(){return this.getPropertyValue("background-color")},enumerable:!0,configurable:!0};
//# sourceMappingURL=jspm_packages\npm\cssstyle@0.2.11/lib\properties\backgroundColor.js.map