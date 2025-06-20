import express, { Application, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import { client } from '../../config/mongoDB'

const filePath = path.join(__dirname, "../../../db/todo.json")

export const todosRoute = express.Router()

todosRoute.get('/', async (req: Request, res: Response) => {
  const db = await client.db('todosDB')
  const connection = db.collection("todos")

  const cursor = await connection.find({})
  const todos = await cursor.toArray()
  res.json({
    message: "get all todos",
    todos
  })
})

todosRoute.post('/create-todo', async (req: Request, res: Response) => {
  const { title, description, priority } = req.body

  const db = await client.db('todosDB')
  const connection = db.collection("todos")
  const todos = connection.insertOne({
    title,
    description,
    priority,
    completed: false
  })

  console.log(todos)

  res.json({
    message: 'successfully create a todo',
    data: {
      title,
      description,
      priority,
      completed: false
    }
  })
})