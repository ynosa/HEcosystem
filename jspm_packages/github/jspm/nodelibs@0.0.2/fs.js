exports.readFileSync=function(n){var t,e=new XMLHttpRequest;return e.open("GET",n,!1),e.onreadystatechange=function(){if(4==e.readyState){var r=e.status;if(r>399&&600>r||400==r)throw"File read error on "+n;t=e.responseText}},e.send(null),t};
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/fs.js.map