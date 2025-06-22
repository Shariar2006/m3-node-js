import express, { Application, Request, Response } from 'express'
import { Schema, model } from 'mongoose'

const app: Application = express()

app.use(express.json())

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['personal', 'office', 'other'],
        default: 'personal'
    },
    tags: {
        label: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'gray'
        }
    }
},
{
    versionKey: false,
    timestamps: true
})

const Note = model("Note", noteSchema)

// create a note
app.post('/notes/create-note', async (req: Request, res: Response) => {
    const body = req.body;

    const note = await Note.create(body)

    res.status(200).json({
        message: 'successfully created a note',
        note
    })
})

// get note
app.get('/notes', async (req: Request, res: Response) => {
    const notes = await Note.find()

    res.status(200).json({
        message: 'successfully get all note',
        notes
    })
})

// get a note
app.get('/notes/:id', async (req: Request, res: Response) => {
    const noteID = req.params.id
    const note = await Note.findById(noteID)

    res.status(200).json({
        message: 'successfully get a note',
        note
    })
})

// update a note
app.patch('/notes/:id', async (req: Request, res: Response) => {
    const noteID = req.params.id
    const noteBody = req.body
    const note = await Note.findByIdAndUpdate(noteID, noteBody, {new: true})

    res.status(200).json({
        message: 'successfully updated a note',
        note
    })
})

// delete a note
app.delete('/notes/delete-note/:id', async (req: Request, res: Response) => {
    const noteID = req.params.id
    const note = await Note.findByIdAndDelete(noteID)

    res.status(200).json({
        message: 'successfully delete a note',
        note
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send('server starting')
})

export default app