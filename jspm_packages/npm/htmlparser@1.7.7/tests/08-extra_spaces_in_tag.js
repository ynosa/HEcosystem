!function(){function t(){return"function"==typeof require&&"object"==typeof exports&&"object"==typeof module&&"string"==typeof __filename&&"string"==typeof __dirname}t()||(this.Tautologistics||(this.Tautologistics={}),this.Tautologistics.NodeHtmlParser||(this.Tautologistics.NodeHtmlParser={}),this.Tautologistics.NodeHtmlParser.Tests||(this.Tautologistics.NodeHtmlParser.Tests=[]),exports={},this.Tautologistics.NodeHtmlParser.Tests.push(exports)),exports.name="Extra spaces in tag",exports.options={handler:{},parser:{}},exports.html="<\n font	\n size='14' \n>the text<\n /	\nfont	 \n>",exports.expected=[{raw:"\n font	\n size='14' \n",data:"font	\n size='14'",type:"tag",name:"font",attribs:{size:"14"},children:[{raw:"the text",data:"the text",type:"text"}]}]}();
//# sourceMappingURL=jspm_packages\npm\htmlparser@1.7.7/tests\08-extra_spaces_in_tag.js.map