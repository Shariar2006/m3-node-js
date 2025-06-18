import express, { Application, Request, Response } from 'express'
const app: Application = express()
import path from 'path'
import fs from 'fs'

const filePath = path.join(__dirname, "../db/todo.json")

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/todos', (req: Request, res: Response) => {
    const data = fs.readFileSync(filePath, {encoding: "utf-8"})
    console.log(data)
  res.json(data)
})

app.post('/todos/create-todo', (req: Request, res: Response) => {
    const data = req.body
    console.log(data)
  res.send('hello world')
})



export default app;