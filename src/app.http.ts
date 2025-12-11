import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    console.log(req.url);
    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        });

        res.end(htmlFile);
        return;
    }

    if(req.url?.endsWith('.js')){
        res.writeHead(200, {
            'Content-Type' : 'application/javascript'
        });
        const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8');
        res.end(responseContent);
        return;
    }

    if(req.url?.endsWith('.css')){
        res.writeHead(200, {
            'Content-Type' : 'text/css'
        });
        const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8');
        res.end(responseContent);
        return;
    }

    
});



server.listen(8080, () => {
    console.log('server running on port 8080');
})
