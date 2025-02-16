// create web server

var http = require('http'); // import module http
var url = require('url');
var fs = require('fs');
var comments = require('./comments.js');

// create server
http.createServer(function(request, response) {
	var url_parts = url.parse(request.url, true);
	var path = url_parts.pathname;
	
	if (path == '/comment') {
		var query = url_parts.query;
		var name = query.name;
		var comment = query.comment;
		
		comments.add_comment(name, comment, function() {
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.end('Comment added successfully');
		});
	} else if (path == '/get_comments') {
		comments.get_comments(function(data) {
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.end(JSON.stringify(data));
		});
	} else {
		fs.readFile('index.html', function(error, data) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		});
	}
}).listen(8000);