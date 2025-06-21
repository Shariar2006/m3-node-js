import express, { Application, Request, Response } from 'express'
import { client } from '../../config/mongoDB'
import { ObjectId } from 'mongodb'

export const todosRoute = express.Router()

// get all todos
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

// create a todo
todosRoute.post('/create-todo', async (req: Request, res: Response) => {
  const { title, description, priority } = req.body

  const db = await client.db('todosDB')
  const connection = await db.collection("todos")
  const todos = await connection.insertOne({
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

// get single todo
todosRoute.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id

  const db = await client.db('todosDB')
  const connection = await db.collection("todos")

  const todos = await connection.findOne({ _id: new ObjectId(id) })
  res.json({
    message: "get single todo",
    todos
  })
})

// update a todo
todosRoute.patch('/update-todo/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const { title, description, priority, completed } = req.body

  const db = await client.db('todosDB')
  const connection = await db.collection("todos")
  const filterId = { _id: new ObjectId(id) }
  const updateTodo = await connection.updateOne(filterId,
    {
      $set: {
        title,
        description,
        priority,
        completed
      }
    },
    { upsert: true }
  )

  console.log(updateTodo)

  res.json({
    message: 'successfully update a todo',
    data: {
      title,
      description,
      priority,
      completed
    }
  })
})

// delete a todo
todosRoute.delete('/delete-todo/:id', async (req: Request, res: Response) => {
  const id = req.params.id

  const db = await client.db('todosDB')
  const connection = await db.collection("todos")
  const todos = await connection.deleteOne({ _id: new ObjectId(id) })

  console.log(todos)

  res.json({
    message: 'successfully deleted a todo',
    todos
  })
})