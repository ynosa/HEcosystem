"use strict";var shorthandParser=require("../parsers").shorthandParser,shorthand_for={borderTopWidth:require("./borderTopWidth"),borderTopStyle:require("./borderTopStyle"),borderTopColor:require("./borderTopColor")},isValid=module.exports.isValid=function(t){return void 0!==shorthandParser(t,shorthand_for)};module.exports.definition={set:function(t){var e=shorthandParser(t,shorthand_for);void 0!==e&&(Object.keys(e).forEach(function(t){this._values[t]=e[t]},this),this.setProperty("border-top",t))},get:function(){return this.getPropertyValue("border-top")},enumerable:!0,configurable:!0};
//# sourceMappingURL=jspm_packages\npm\cssstyle@0.2.11/lib\properties\borderTop.js.map