import express, { Application, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'

const filePath = path.join(__dirname, "../../../db/todo.json")

export const todosRoute = express.Router()

todosRoute.get('/', (req: Request, res: Response) => {
    const data = fs.readFileSync(filePath, {encoding: "utf-8"})
    console.log(data)
  res.json({
    message: "all todos data",
    data
})
})

todosRoute.post('/create-todo', (req: Request, res: Response) => {
    const data = req.body
    console.log(data)
  res.send('hello world')
})