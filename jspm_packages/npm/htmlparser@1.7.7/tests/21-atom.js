!function(){function t(){return"function"==typeof require&&"object"==typeof exports&&"object"==typeof module&&"string"==typeof __filename&&"string"==typeof __dirname}t()||(this.Tautologistics||(this.Tautologistics={}),this.Tautologistics.NodeHtmlParser||(this.Tautologistics.NodeHtmlParser={}),this.Tautologistics.NodeHtmlParser.Tests||(this.Tautologistics.NodeHtmlParser.Tests=[]),exports={},this.Tautologistics.NodeHtmlParser.Tests.push(exports)),exports.name="Atom (1.0)",exports.options={handler:{},parser:{}},exports.type="rss",exports.html='<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom">	<title>Example Feed</title>	<subtitle>A subtitle.</subtitle>	<link href="http://example.org/feed/" rel="self" />	<link href="http://example.org/" />	<id>urn:uuid:60a76c80-d399-11d9-b91C-0003939e0af6</id>	<updated>2003-12-13T18:30:02Z</updated>	<author>		<name>John Doe</name>		<email>johndoe@example.com</email>	</author>	<entry>		<title>Atom-Powered Robots Run Amok</title>		<link href="http://example.org/2003/12/13/atom03" />		<link rel="alternate" type="text/html" href="http://example.org/2003/12/13/atom03.html"/>		<link rel="edit" href="http://example.org/2003/12/13/atom03/edit"/>		<id>urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a</id>		<updated>2003-12-13T18:30:02Z</updated>		<summary>Some text.</summary>	</entry></feed>',exports.expected={type:"atom",id:"urn:uuid:60a76c80-d399-11d9-b91C-0003939e0af6",title:"Example Feed",link:"http://example.org/feed/",description:"A subtitle.",updated:new Date("2003-12-13T18:30:02Z"),author:"johndoe@example.com",items:[{id:"urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a",title:"Atom-Powered Robots Run Amok",link:"http://example.org/2003/12/13/atom03",description:"Some text.",pubDate:new Date("2003-12-13T18:30:02Z")}]}}();
//# sourceMappingURL=jspm_packages\npm\htmlparser@1.7.7/tests\21-atom.js.map