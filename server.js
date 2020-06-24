const http = require('http');

const mahasiswa = [
    {id:1, name: 'Andre', nim: 23423},
    {id:2, name: 'Jack' , nim: 82423},
    {id:3, name: 'Alex', nim: 45332}
    ];

const server = http.createServer( (req, res, next) => {
    const {method, url,} = req;
    let body = [];

    req
        .on('data', chunk => {
        body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();

            let status = 400;
            const response = {
                success: false,
                data: null,
                message: null,
            }

            if (method === 'GET' && url === '/mahasiswa') {
                status = 200;
                response.success = true;
                response.data = mahasiswa;
            } else if (method === 'POST' && url === '/mahasiswa') {
                const {id, name, nim} = JSON.parse(body);

                if (!id || !name || !nim) {
                    status = 400
                    response.message = 'Please input your data!'
                } else {
                    status = 200;
                    response.success = true;
                    response.data = mahasiswa;
                }

            }

            res.writeHead(status,{
                'Content-Type': 'application/json',
                'X-Power-By': 'Node.js'
            });

            res.end(JSON.stringify(response));
        })
});

const port = 5000;

server.listen(port, () => console.log(`Server listening on port ${port}`));