// Create web server
// 1. Create a web server
// 2. Create a route
// 3. Create a response
// 4. Return a response
// 5. Listen on a port

// 1. Create a web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// 2. Create a route
http.createServer((req, res) => {
    // 3. Create a response
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpg'
            break;
        default:
            contentType = 'text/html'
    }
    if (contentType == 'text/html' && extname == '') filePath += '.html';
    // 4. Return a response
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    })
    // 5. Listen on a port
}).listen(3000, () => console.log('Server running on port 3000'))