const http = require('http');

const mahasiswa = [
    {id:1, name: 'Andre', nim: 23423},
    {id:2, name: 'Jack' , nim: 82423},
    {id:3, name: 'Alex', nim: 45332}
    ];

const server = http.createServer( (req, res, next) => {
   res.setHeader('Content-Type', 'application/json');
   res.setHeader('X-Power-By','Node.js');
   res.end(JSON.stringify({
       success: true,
       data: mahasiswa
   }));
});

const port = 5000;

server.listen(port, () => console.log(`Server listening on port ${port}`));