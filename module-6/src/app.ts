import express, { Application, Request, Response } from 'express'
import { Schema, model } from 'mongoose'

const app: Application = express()

const noteSchema = new Schema({
    title: String,
    content: String
})

const Note = model("Note", noteSchema)

app.post('/create-note', (req: Request, res: Response)=>{
    const myNote = new Note({
        title: 'learning mongoose',
        content: "I am learning mongoose"
    })
    myNote.save()
    
    res.status(200).json({
        message: 'successfully created a note',
        note: myNote
    })
})

app.get('/', (req: Request, res: Response)=>{
    res.send('server starting')
})

export default app