var galaxy = require('galaxy');

var sleep = galaxy.star(setTimeout, 0);

function* hello() {
	console.log("hello ...");
	yield sleep(null, 1000);
	console.log("world!");
	return "bye";
}

galaxy.unstar(hello)(function(err, result) {
	if (err) throw err;
	console.log(result);
});

//# sourceMappingURL=jspm_packages\npm\galaxy@0.1.4/examples\hello.js.map