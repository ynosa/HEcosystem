"use strict";var parsers=require("../parsers");module.exports.definition={set:function(t){var e=parsers.valueType(t);if(e===parsers.TYPES.ANGLE)return this.setProperty("azimuth",parsers.parseAngle(t));if(e===parsers.TYPES.KEYWORD){var r=t.toLowerCase().trim().split(/\s+/),n=!1;if(r.length>2)return;var i=r.indexOf("behind");if(n=-1!==i,2===r.length){if(!n)return;r.splice(i,1)}if("leftwards"===r[0]||"rightwards"===r[0]){if(n)return;return this.setProperty("azimuth",r[0])}if("behind"===r[0])return this.setProperty("azimuth","180deg");switch(r[0]){case"left-side":return this.setProperty("azimuth","270deg");case"far-left":return this.setProperty("azimuth",(n?240:300)+"deg");case"left":return this.setProperty("azimuth",(n?220:320)+"deg");case"center-left":return this.setProperty("azimuth",(n?200:340)+"deg");case"center":return this.setProperty("azimuth",(n?180:0)+"deg");case"center-right":return this.setProperty("azimuth",(n?160:20)+"deg");case"right":return this.setProperty("azimuth",(n?140:40)+"deg");case"far-right":return this.setProperty("azimuth",(n?120:60)+"deg");case"right-side":return this.setProperty("azimuth","90deg");default:return}}},get:function(){return this.getPropertyValue("azimuth")},enumerable:!0,configurable:!0};
//# sourceMappingURL=jspm_packages\npm\cssstyle@0.2.11/lib\properties\azimuth.js.map