const http = require('http');

const server = http.createServer((req, res) => {
    res.end('welcome to server')
})

server.listen(3080, '127.0.0.1', () => {
    console.log('successfully start server')
})