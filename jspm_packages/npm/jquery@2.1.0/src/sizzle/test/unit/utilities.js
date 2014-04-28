function testAttr(e){expect(9);var t;e?(t=e.createElement("input"),t.setAttribute("type","checkbox")):t=jQuery("<input type='checkbox' checked='checked' />")[0],t.setAttribute("checked","checked"),t.setAttribute("id","id"),t.setAttribute("value","on"),strictEqual(Sizzle.attr(t,"nonexistent"),null,"nonexistent"),strictEqual(Sizzle.attr(t,"id"),"id","existent"),strictEqual(Sizzle.attr(t,"value"),"on","value"),strictEqual(Sizzle.attr(t,"checked"),"checked","boolean"),strictEqual(Sizzle.attr(t,"href"),null,"interpolation risk"),strictEqual(Sizzle.attr(t,"constructor"),null,'Object.prototype property "constructor" (negative)'),strictEqual(Sizzle.attr(t,"watch"),null,'Gecko Object.prototype property "watch" (negative)'),t.setAttribute("constructor","foo"),t.setAttribute("watch","bar"),strictEqual(Sizzle.attr(t,"constructor"),"foo",'Object.prototype property "constructor"'),strictEqual(Sizzle.attr(t,"watch"),"bar",'Gecko Object.prototype property "watch"')}module("utilities",{teardown:moduleTeardown}),test("Sizzle.attr (HTML)",function(){testAttr()}),test("Sizzle.attr (XML)",function(){testAttr(jQuery.parseXML("<root/>"))}),test("Sizzle.contains",function(){expect(16);var e=document.getElementById("nonnodes"),t=e.firstChild,n=t.nextSibling,r=e.nextSibling,i=document.createElement("a");ok(t&&1===t.nodeType,"preliminary: found element"),ok(n&&3===n.nodeType,"preliminary: found text"),ok(r,"preliminary: found non-descendant"),ok(Sizzle.contains(e,t),"child"),ok(Sizzle.contains(e.parentNode,t),"grandchild"),ok(Sizzle.contains(e,n),"text child"),ok(Sizzle.contains(e.parentNode,n),"text grandchild"),ok(!Sizzle.contains(e,e),"self"),ok(!Sizzle.contains(t,e),"parent"),ok(!Sizzle.contains(e,r),"non-descendant"),ok(!Sizzle.contains(e,document),"document"),ok(!Sizzle.contains(e,document.documentElement),"documentElement (negative)"),ok(!Sizzle.contains(e,null),"Passing null does not throw an error"),ok(Sizzle.contains(document,document.documentElement),"documentElement (positive)"),ok(Sizzle.contains(document,t),"document container (positive)"),ok(!Sizzle.contains(document,i),"document container (negative)")}),jQuery("<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='1' width='1'><g/></svg>")[0].firstChild&&test("Sizzle.contains in SVG (jQuery #10832)",function(){expect(4);var e=jQuery("<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='1' width='1'><g><circle cx='1' cy='1' r='1' /></g></svg>").appendTo("#qunit-fixture")[0];ok(Sizzle.contains(e,e.firstChild),"root child"),ok(Sizzle.contains(e.firstChild,e.firstChild.firstChild),"element child"),ok(Sizzle.contains(e,e.firstChild.firstChild),"root granchild"),ok(!Sizzle.contains(e.firstChild.firstChild,e.firstChild),"parent (negative)")}),test("Sizzle.uniqueSort",function(){function e(e){for(var t=this.length=e.length;t--;)this[t]=e[t]}expect(14),e.prototype={slice:[].slice,sort:[].sort,splice:[].splice};var t,n,r=[],i=document.body,o=document.getElementById("qunit-fixture"),s=document.createElement("p"),a=document.createElement("ul"),u=s.appendChild(document.createElement("a")),l=u.appendChild(document.createElement("b"));for(t=0;12>t;t++)r.push(document.createElement("li")),r[t].id="detached"+t,a.appendChild(document.createElement("li")).id="detachedChild"+t;n={Empty:{input:[],expected:[]},"Single-element":{input:[o],expected:[o]},"No duplicates":{input:[o,i],expected:[i,o]},Duplicates:{input:[i,o,o,i],expected:[i,o]},Detached:{input:r.slice(0),expected:r.slice(0)},"Detached children":{input:[a.childNodes[0],a.childNodes[1],a.childNodes[2],a.childNodes[3]],expected:[a.childNodes[0],a.childNodes[1],a.childNodes[2],a.childNodes[3]]},"Attached/detached mixture":{input:[s,o,a,document,u,i,l],expected:[document,i,o],length:3}},jQuery.each(n,function(t,n){var r=n.length||n.input.length;deepEqual(Sizzle.uniqueSort(n.input).slice(0,r),n.expected,t+" (array)"),deepEqual(Sizzle.uniqueSort(new e(n.input)).slice(0,r),n.expected,t+" (quasi-array)")})}),testIframeWithCallback("Sizzle.uniqueSort works cross-window (jQuery #14381)","mixed_sort.html",deepEqual);
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\sizzle\test\unit\utilities.js.map