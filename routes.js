
const fs = require('fs');

const handRoutes = (req, res) => {
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
        const body = [];
        req.on('data', (chunck) => {
            body.push(chunck);
        });
        return req.on('end', ()=> {
            const parsedBody = Buffer.concat(body).toString();
            const messange = parsedBody.split('=')[1];           
            fs.writeFile('messanger.txt', messange, error  => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });  
    }
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
       Hello Word ! 
    </body>
    </html>
    `);
    res.end();
}
module.exports = handRoutes;