exports.readFileSync=function(e){var t,E=new XMLHttpRequest;return E.open("GET",e,!1),E.onreadystatechange=function(){if(4==E.readyState){var S=E.status;if(S>399&&600>S||400==S)throw"File read error on "+e;t=E.responseText}},E.send(null),t};