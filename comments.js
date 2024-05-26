//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
var server = http.createServer(function(req, res){
    var parseUrl = url.parse(req.url, true);
    var pathName = parseUrl.pathname;
    if(pathName === '/'){
        fs.readFile('./index.html', function(err, data){
            if(err){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('404 Not Found');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }else if(pathName === '/post'){
        fs.readFile('./post.html', function(err, data){
            if(err){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('404 Not Found');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }else if(pathName === '/comment'){
        var comment = parseUrl.query;
        comments.push(comment);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(comments));
    }else if(pathName === '/getcomment'){
        var str = JSON.stringify(comments);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(str);
    }else{
        var realPath = path.join('./', pathName);
        fs.exists(realPath, function(exists){
            if(!exists){
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('404 Not Found');
            }else{
                fs.readFile(realPath, function(err, data){
                    if(err){
                        res.writeHead(500, {'Content-Type': 'text/html'});
                        res.end('500 Server Error');
                    }
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                });
            }
        });
    }
});
server.listen(3000, ');)))');
