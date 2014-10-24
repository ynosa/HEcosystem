"use strict";var util=require("github:jspm/nodelibs@0.0.2/util"),cssstyle=require("../lib/CSSStyleDeclaration"),camelToDashed=require("../lib/parsers").camelToDashed,properties=["azimuth","background","backgroundAttachment","backgroundColor","backgroundImage","backgroundPosition","backgroundRepeat","border","borderCollapse","borderColor","borderSpacing","borderStyle","borderTop","borderRight","borderBottom","borderLeft","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderWidth","bottom","captionSide","clear","clip","color","content","counterIncrement","counterReset","cue","cueAfter","cueBefore","cursor","direction","display","elevation","emptyCells","cssFloat","font","fontFamily","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontWeight","height","left","letterSpacing","lineHeight","listStyle","listStyleImage","listStylePosition","listStyleType","margin","marginTop","marginRight","marginBottom","marginLeft","markerOffset","marks","maxHeight","maxWidth","minHeight","minWidth","orphans","outline","outlineColor","outlineStyle","outlineWidth","overflow","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","page","pageBreakAfter","pageBreakBefore","pageBreakInside","pause","pauseAfter","pauseBefore","pitch","pitchRange","playDuring","position","quotes","richness","right","size","speak","speakHeader","speakNumeral","speakPunctuation","speechRate","stress","tableLayout","textAlign","textDecoration","textIndent","textShadow","textTransform","top","unicodeBidi","verticalAlign","visibility","voiceFamily","volume","whiteSpace","widows","width","wordSpacing","zIndex"],dashed_properties=properties.map(function(e){return camelToDashed(e)});module.exports={"Verify Has Properties":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(2*properties.length),properties.forEach(function(r){e.ok(t.__lookupGetter__(r),"missing "+r+" property"),e.ok(t.__lookupSetter__(r),"missing "+r+" property")}),e.done()},"Verify Has Dashed Properties":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(2*dashed_properties.length),dashed_properties.forEach(function(r){e.ok(t.__lookupGetter__(r),"missing "+r+" property"),e.ok(t.__lookupSetter__(r),"missing "+r+" property")}),e.done()},"Verify Has Functions":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(6),e.ok("function"==typeof t.getPropertyValue,"missing getPropertyValue()"),e.ok("function"==typeof t.getPropertyCSSValue,"missing getPropertyCSSValue()"),e.ok("function"==typeof t.removeProperty,"missing removeProperty()"),e.ok("function"==typeof t.getPropertyPriority,"missing getPropertyPriority()"),e.ok("function"==typeof t.setProperty,"missing setProperty()"),e.ok("function"==typeof t.item,"missing item()"),e.done()},"Verify Has Special Properties":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(5),e.ok(t.__lookupGetter__("cssText"),"missing cssText getter"),e.ok(t.__lookupSetter__("cssText"),"missing cssText setter"),e.ok(t.__lookupGetter__("length"),"missing length getter"),e.ok(t.__lookupSetter__("length"),"missing length setter"),e.ok(t.__lookupGetter__("parentRule"),"missing parentRule getter"),e.done()},"Test From Style String":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(8),t.cssText="color: blue; background-color: red; width: 78%",e.ok(3===t.length,"length is not 3"),e.ok("color: blue; background-color: red; width: 78%;"===t.cssText,"cssText is wrong"),e.ok("blue"===t.getPropertyValue("color"),"getPropertyValue('color') failed"),e.ok("color"===t.item(0),"item(0) failed"),e.ok("background-color"===t[1],"style[1] failed"),e.ok("red"===t.backgroundColor,'style.backgroundColor failed with "'+t.backgroundColor+'"'),t.cssText="",e.ok(""===t.cssText,"cssText is not empty"),e.ok(0===t.length,"length is not 0"),e.done()},"Test From Properties":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(11),t.color="blue",e.ok(1===t.length,"length is not 1"),e.ok("color"===t[0],"style[0] is not color"),e.ok("color: blue;"===t.cssText,"cssText is wrong"),e.ok("color"===t.item(0),"item(0) is not color"),e.ok("blue"===t.color,"color is not blue"),t.backgroundColor="red",e.ok(2===t.length,"length is not 2"),e.ok("color"===t[0],"style[0] is not color"),e.ok("background-color"===t[1],"style[1] is not background-color"),e.ok("color: blue; background-color: red;"===t.cssText,"cssText is wrong"),e.ok("red"===t.backgroundColor,"backgroundColor is not red"),t.removeProperty("color"),e.ok("background-color"===t[0],"style[0] is not background-color"),e.done()},"Test Shorthand Properties":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(11),t.background="blue url(http://www.example.com/some_img.jpg)",e.ok("blue"===t.backgroundColor,"backgroundColor is not blue"),e.ok("url(http://www.example.com/some_img.jpg)"===t.backgroundImage,"backgroundImage is wrong"),e.ok("blue url(http://www.example.com/some_img.jpg)"===t.background,"background is different"),t.border="0 solid black",e.ok("0px",t.borderWidth,"borderWidth is not 0px"),e.ok("solid",t.borderStyle,"borderStyle is not solid"),e.ok("black",t.borderColor,"borderColor is not black"),e.ok("0px",t.borderTopWidth,"borderTopWidth is not 0px"),e.ok("solid",t.borderLeftStyle,"borderLeftStyle is not solid"),e.ok("black",t.borderBottomColor,"borderBottomColor is not black"),t.font="12em monospace",e.ok("12em",t.fontSize,"fontSize is not 12em"),e.ok("monospace",t.fontFamily,"fontFamily is not monospace"),e.done()},"Test width and height Properties and null and empty strings":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(7),t.height=6,e.ok(""===t.height,"height does not remain unset"),t.width=0,e.ok("0px"===t.width,"width is not 0px"),t.height="34%",e.ok("34%"===t.height,"height is not 34%"),t.height="",e.ok(1===t.length,"length is not 1"),e.ok("width: 0px;"===t.cssText,'cssText is not "width: 0px;"'),t.width=null,e.ok(0===t.length,"length is not 0"),e.ok(""===t.cssText,"cssText is not empty string"),e.done()},"Test Implicit Properties":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(7),t.borderWidth=0,e.ok(1===t.length,"length is not 1"),e.ok("0px"===t.borderWidth,"borderWidth is not 0px"),e.ok("0px"===t.borderTopWidth,"borderTopWidth is not 0px"),e.ok("0px"===t.borderBottomWidth,"borderBottomWidth is not 0px"),e.ok("0px"===t.borderLeftWidth,"borderLeftWidth is not 0px"),e.ok("0px"===t.borderRightWidth,"borderRightWidth is not 0px"),e.ok("border-width: 0px;"===t.cssText,'cssText is not "border-width: 0px", "'+t.cssText+'"'),e.done()},"Test Top, Left, Right, Bottom Properties":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(6),t.top=0,t.left="0%",t.right="5em",t.bottom="12pt",e.ok("0px"===t.top,"top is not 0px"),e.ok("0%"===t.left,"left is not 0%"),e.ok("5em"===t.right,"right is not 5em"),e.ok("12pt"===t.bottom,"bottom is not 12pt"),e.ok(4===t.length,"length is not 4"),e.ok("top: 0px; left: 0%; right: 5em; bottom: 12pt;"===t.cssText,'text is not "top: 0px; left: 0%; right: 5em; bottom: 12pt;"'),e.done()},"Test Clear and Clip Properties":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(10),t.clear="none",e.ok("none"===t.clear,"clear is not none"),t.clear="lfet",e.ok("none"===t.clear,"clear is not still none"),t.clear="left",e.ok("left"===t.clear,"clear is not left"),t.clear="right",e.ok("right"===t.clear,"clear is not right"),t.clear="both",e.ok("both"===t.clear,"clear is not both"),t.clip="elipse(5px, 10px)",e.ok(""===t.clip,"clip should not be set"),e.ok(1===t.length,"length is not 1"),t.clip="rect(0, 3Em, 2pt, 50%)",e.ok("rect(0px, 3em, 2pt, 50%)"===t.clip,'clip is not "rect(0px, 3em, 2pt, 50%)", "'+t.clip+'"'),e.ok(2===t.length,"length is not 2"),e.ok("clear: both; clip: rect(0px, 3em, 2pt, 50%);"===t.cssText,'cssText is not "clear: both; clip: rect(0px, 3em, 2pt, 50%);"'),e.done()},"Test colors":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(4),t.color="rgba(0,0,0,0)",e.ok("rgba(0, 0, 0, 0)"===t.color,"color is not rgba(0, 0, 0, 0)"),t.color="rgba(5%, 10%, 20%, 0.4)",e.ok("rgba(12, 25, 51, 0.4)"===t.color,"color is not rgba(12, 25, 51, 0.4)"),t.color="rgb(33%, 34%, 33%)",e.ok("rgb(84, 86, 84)"===t.color,"color is not rgb(84, 86, 84)"),t.color="rgba(300, 200, 100, 1.5)",e.ok("rgb(255, 200, 100)"===t.color,"color is not rgb(255, 200, 100) "+t.color),e.done()},"Test short hand properties with embedded spaces":function(e){var t=new cssstyle.CSSStyleDeclaration;e.expect(3),t.background="rgb(0, 0, 0) url(/something/somewhere.jpg)",e.ok("rgb(0, 0, 0)"===t.backgroundColor,"backgroundColor is not rgb(0, 0, 0): "+t.backgroundColor),e.ok("url(/something/somewhere.jpg)"===t.backgroundImage,"backgroundImage is not url(/something/somewhere.jpg): "+t.backgroundImage),e.ok("background: rgb(0, 0, 0) url(/something/somewhere.jpg);"===t.cssText,"cssText is not correct: "+t.cssText),e.done()}};
//# sourceMappingURL=jspm_packages\npm\cssstyle@0.2.11/tests\tests.js.map