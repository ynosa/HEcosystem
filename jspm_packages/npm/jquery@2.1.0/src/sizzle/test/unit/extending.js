module("extending",{teardown:moduleTeardown}),test("custom pseudos",function(){expect(6),Sizzle.selectors.filters.foundation=Sizzle.selectors.filters.root,deepEqual(Sizzle(":foundation"),[document.documentElement],"Copy element filter with new name"),delete Sizzle.selectors.filters.foundation,Sizzle.selectors.setFilters.primary=Sizzle.selectors.setFilters.first,t("Copy set filter with new name","div:primary",["qunit"]),delete Sizzle.selectors.setFilters.primary,Sizzle.selectors.filters.aristotlean=Sizzle.selectors.createPseudo(function(){return function(e){return!!e.id}}),t("Custom element filter","#foo :aristotlean",["sndp","en","yahoo","sap","anchor2","simon"]),delete Sizzle.selectors.filters.aristotlean,Sizzle.selectors.filters.endswith=Sizzle.selectors.createPseudo(function(e){return function(t){return Sizzle.getText(t).slice(-e.length)===e}}),t("Custom element filter with argument","a:endswith(ogle)",["google"]),delete Sizzle.selectors.filters.endswith,Sizzle.selectors.setFilters.second=Sizzle.selectors.createPseudo(function(){return Sizzle.selectors.createPseudo(function(e,t){e[1]&&(t[1]=e[1],e[1]=!1)})}),t("Custom set filter","#qunit-fixture p:second",["ap"]),delete Sizzle.selectors.filters.second,Sizzle.selectors.setFilters.slice=Sizzle.selectors.createPseudo(function(e){var t=e.split(":");return Sizzle.selectors.createPseudo(function(e,n){for(var r=t[1];--r>=t[0];)e[r]&&(n[r]=e[r],e[r]=!1)})}),t("Custom set filter with argument","#qunit-fixture p:slice(1:3)",["ap","sndp"]),delete Sizzle.selectors.filters.slice}),test("backwards-compatible custom pseudos",function(){expect(3),Sizzle.selectors.filters.icontains=function(e,t,n){return Sizzle.getText(e).toLowerCase().indexOf((n[3]||"").toLowerCase())>-1},t("Custom element filter with argument","a:icontains(THIS BLOG ENTRY)",["simon1"]),delete Sizzle.selectors.filters.icontains,Sizzle.selectors.setFilters.podium=function(e,t){var n=null==t||""===t?3:+t;return e.slice(0,n)},t("Custom setFilter","form#form :PODIUM",["label-for","text1","text2"]),t("Custom setFilter with argument","#form input:Podium(1)",["text1"]),delete Sizzle.selectors.setFilters.podium}),test("custom attribute getters",function(){expect(2);var e=Sizzle.selectors.attrHandle.hreflang,n="a:contains('mark')[hreflang='http://diveintomark.org/en']";Sizzle.selectors.attrHandle.hreflang=function(e,t){var n=e.getAttribute("href"),r=e.getAttribute(t);return r&&n+r},deepEqual(Sizzle(n,createWithFriesXML()),[],"Custom attrHandle (preferred document)"),t("Custom attrHandle (preferred document)",n,["mark"]),Sizzle.selectors.attrHandle.hreflang=e});
//# sourceMappingURL=jspm_packages\npm\jquery@2.1.0/src\sizzle\test\unit\extending.js.map