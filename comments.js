//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

//create server
http.createServer(function(req, res){
	//parse the request
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var pathname = url_parts.pathname;

	//respond to the request
	if(pathname == '/'){
		//read the file
		fs.readFile('comments.html', function(err, data){
			//send the file
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data);
		});
	}
	else if(pathname == '/comments'){
		//read the file
		fs.readFile('comments.txt', 'utf8', function(err, data){
			//send the file
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(data);
		});
	}
	else if(pathname == '/addComment'){
		//read the file
		fs.readFile('comments.txt', 'utf8', function(err, data){
			//parse the file
			var comments = JSON.parse(data);
			//add a new comment
			comments.push(query);
			//write the file
			fs.writeFile('comments.txt', JSON.stringify(comments), function(err){
				//send the file
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end('{"status": "success"}');
			});
		});
	}
	else{
		//send a 404
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('404: Page not found');
	}
}).listen(3000);

console.log('Server running on port 3000');
