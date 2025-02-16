// Create web server
// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

// Read comments from file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Create a web server
http.createServer(function (request, response) {
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url, true).query;

    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");

    // Read the requested file content from file system
    if (pathname === '/comments.json') {
        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        response.end(JSON.stringify(comments));
    } else if (pathname === '/add-comment') {
        // Add new comment
        var newComment = query;
        comments.push(newComment);
        fs.writeFileSync('comments.json', JSON.stringify(comments), 'utf8');

        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        response.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, pathname), function (err, data) {
            if (err) {
                console.log(err);
                // HTTP Status: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });
            } else {
                //Page found
                // HTTP Status: 200 : OK
                // Content Type: text/plain
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                // Write the content of the file to response body
                response.write(data.toString());
            }
            // Send the response body
            response.end();
        });
    }
}).listen(8081);


