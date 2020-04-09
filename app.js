const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(, req.headers, );
    // process.exit() process the end process  
    const method = req.method;
    const url = req.url;
    if(url === '/'){
            res.setHeader('Content-Type', 'text/html');
            res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <form action="/messenger" method="POST">
                    <input type="text" name="messenger">
                    <button type="submit">Logar</button>
                </form>
            </body>
            </html>
            `);
        return res.end();
    }
    if(url === '/messenger' && method === 'POST'){
        fs.writeFileSync('messanger.txt', 'Hamilton Silva');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.end();
});

server.listen(3000);