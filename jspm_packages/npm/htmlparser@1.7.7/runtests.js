/***********************************************
Copyright 2010, Chris Winberry <chris@winberry.net>. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
***********************************************/
var sys=require("sys"),fs=require("github:jspm/nodelibs@0.0.2/fs"),htmlparser=require("./lib/htmlparser"),testFolder="./tests",chunkSize=5,testFiles=fs.readdirSync(testFolder),testCount=0,failedCount=0;for(var i in testFiles){testCount++;var fileParts=testFiles[i].split(".");fileParts.pop();var moduleName=fileParts.join("."),test=require(testFolder+"/"+moduleName),handlerCallback=function(t){t&&sys.puts("Handler error: "+t)},handler="rss"==test.type?new htmlparser.RssHandler(handlerCallback,test.options.handler):new htmlparser.DefaultHandler(handlerCallback,test.options.handler),parser=new htmlparser.Parser(handler,test.options.parser);parser.parseComplete(test.html);var resultComplete=handler.dom,chunkPos=0;for(parser.reset();chunkPos<test.html.length;)parser.parseChunk(test.html.substring(chunkPos,chunkPos+chunkSize)),chunkPos+=chunkSize;parser.done();var resultChunk=handler.dom,testResult=sys.inspect(resultComplete,!1,null)===sys.inspect(test.expected,!1,null)&&sys.inspect(resultChunk,!1,null)===sys.inspect(test.expected,!1,null);sys.puts("["+test.name+"]: "+(testResult?"passed":"FAILED")),testResult||(failedCount++,sys.puts("== Complete =="),sys.puts(sys.inspect(resultComplete,!1,null)),sys.puts("== Chunked =="),sys.puts(sys.inspect(resultChunk,!1,null)),sys.puts("== Expected =="),sys.puts(sys.inspect(test.expected,!1,null)))}sys.puts("Total tests: "+testCount),sys.puts("Failed tests: "+failedCount);
//# sourceMappingURL=jspm_packages\npm\htmlparser@1.7.7/runtests.js.map