//create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const path = require('path');
const comments = [];
http.createServer((req, res) => {
    const parseUrl = url.parse(req.url);
    const pathname = parseUrl.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    } else if (pathname === '/comment') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const query = querystring.parse(body);
                comments.push(query.comment);
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        } else if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(comments));
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    } else {
        const ext = path.parse(pathname).ext;
        fs.readFile(`.${pathname}`, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            }
            const contentType = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'text/javascript',
            };
            res.setHeader('Content-Type', contentType[ext]);
            res.end(data);
        });
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
// Path: index.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Comments</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>Comments</h1>
    <form action="/comment" method="post">
        <input type="text" name="comment" placeholder="Enter your comment">
        <input type="