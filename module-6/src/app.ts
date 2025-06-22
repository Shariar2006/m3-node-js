import express, { Application, Request, Response } from 'express'
import { Schema, model } from 'mongoose'
import { noteRoutes } from './app/controllers/note.controller'
import { userRoutes } from './app/controllers/users.controller'

const app: Application = express()

app.use(express.json())

// routes
app.use('/notes', noteRoutes)
app.use('/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('server starting')
})

export default app