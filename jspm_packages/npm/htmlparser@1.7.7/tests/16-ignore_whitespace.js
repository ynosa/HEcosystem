!function(){function t(){return"function"==typeof require&&"object"==typeof exports&&"object"==typeof module&&"string"==typeof __filename&&"string"==typeof __dirname}t()||(this.Tautologistics||(this.Tautologistics={}),this.Tautologistics.NodeHtmlParser||(this.Tautologistics.NodeHtmlParser={}),this.Tautologistics.NodeHtmlParser.Tests||(this.Tautologistics.NodeHtmlParser.Tests=[]),exports={},this.Tautologistics.NodeHtmlParser.Tests.push(exports)),exports.name="Options 'ignoreWhitespace' set to 'true'",exports.options={handler:{ignoreWhitespace:!0},parser:{}},exports.html="Line one\n<br> 	\n<br>\nline two<font>\n <br> x </font>",exports.expected=[{raw:"Line one\n",data:"Line one\n",type:"text"},{raw:"br",data:"br",type:"tag",name:"br"},{raw:"br",data:"br",type:"tag",name:"br"},{raw:"\nline two",data:"\nline two",type:"text"},{raw:"font",data:"font",type:"tag",name:"font",children:[{raw:"br",data:"br",type:"tag",name:"br"},{raw:" x ",data:" x ",type:"text"}]}]}();
//# sourceMappingURL=jspm_packages\npm\htmlparser@1.7.7/tests\16-ignore_whitespace.js.map