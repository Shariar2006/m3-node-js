const http = require('http');
const path = require('path');
const fs = require('fs');
const { json } = require('stream/consumers');

const filePath = path.join(__dirname, "./db/todo.json")

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const pathName = url.pathname

    console.log(req.url, req.method)
    if (pathName === '/todos' & req.method === 'GET') {
        const data = fs.readFileSync(filePath, { encoding: "utf-8" })
        res.writeHead(201, {
            "content-type": "application/json"
        })
        res.end(data)
    }
    else if (pathName === '/todos/create-todo' & req.method === 'POST') {
        let data = '';

        req.on("data", (chunk) => {
            data = data + chunk
        })

        req.on("end", () => {

            const { title, body } = JSON.parse(data)

            const createdAt = new Date().toDateString()

            const allTodoData = fs.readFileSync(filePath, { encoding: "utf-8" })
            const parseData = JSON.parse(allTodoData)

            parseData.push({ title, body, createdAt })

            fs.writeFileSync(filePath, JSON.stringify(parseData, null, 2), { encoding: "utf-8" })

            res.end(JSON.stringify({ title, body, createdAt }, null, 2))
        })

    }
    else if (pathName === '/todo' & req.method === 'GET') {
        const title = url.searchParams.get("title")
        console.log(title)
        const data = fs.readFileSync(filePath, { encoding: "utf-8" })
        const parseData = JSON.parse(data)
        const todo = parseData?.find((todo) => todo.title === title)
        console.log(todo)

        res.writeHead(201, {
            "content-type": "application/json"
        })
        res.end(JSON.stringify(todo))
    }
    else {
        res.end('route not found')
    }
})

server.listen(3080, '127.0.0.1', () => {
    console.log('successfully start server')
})