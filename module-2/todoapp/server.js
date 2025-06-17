const http = require('http');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, "./db/todo.json")

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    if(req.url === '/todos' & req.method === 'GET'){
        const data = fs.readFileSync(filePath, {encoding: "utf-8"})
        res.writeHead(201, {
            "content-type" : "application/json"
        })
        res.end(data)
    }
    else if(req.url === '/todos/create-todo' & req.method === 'POST'){
        res.end('create a todo')
    }else{
        res.end('route not found')
    }
})

server.listen(3080, '127.0.0.1', () => {
    console.log('successfully start server')
})