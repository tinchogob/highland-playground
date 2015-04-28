var _ = require('highland');
var request = require("request");

var sites = [];

for (var i = 0; i <= 10; i++) {
	sites[i] = 'http://httpbin.org/get?q=' + i;
};

var getSite = _.wrapCallback(function (site, cb) {
	request.get(site, function(e, r, b) {
		if (e) cb(e);
		else cb(undefined, b);
	});
});

function play(cb) {
	var res = _(sites).map(getSite).parallel(100).map(JSON.parse).pluck('args');

	res.toArray(function(xs) {
		cb(undefined, xs);
	});
};

play(function(error, response) {
	if (error) return console.log(error);
	console.log(response);
});