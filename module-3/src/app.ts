import express, { Application, Request, Response } from 'express'
import { todosRoute } from './app/todos/todosRoute'
const app: Application = express()


app.use(express.json())

app.use("/todos", todosRoute)





export default app;