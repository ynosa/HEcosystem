exports.readFileSync=function(t){var n,e=new XMLHttpRequest;return e.open("GET",t,!1),e.onreadystatechange=function(){if(4==e.readyState){var r=e.status;if(r>399&&600>r||400==r)throw"File read error on "+t;n=e.responseText}},e.send(null),n};
//# sourceMappingURL=jspm_packages\github\jspm\nodelibs@0.0.2/fs.src.js.map