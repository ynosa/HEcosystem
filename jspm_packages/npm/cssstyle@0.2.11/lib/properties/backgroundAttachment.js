"use strict";var parsers=require("../parsers"),isValid=module.exports.isValid=function(t){return parsers.valueType(t)===parsers.TYPES.KEYWORD&&("scroll"===t.toLowerCase()||"fixed"===t.toLowerCase()||"inherit"===t.toLowerCase())};module.exports.definition={set:function(t){isValid(t)&&this.setProperty("background-attachment",t)},get:function(){return this.getPropertyValue("background-attachment")},enumerable:!0,configurable:!0};
//# sourceMappingURL=jspm_packages\npm\cssstyle@0.2.11/lib\properties\backgroundAttachment.js.map