import express, { Request, Response } from 'express'
import { Note } from '../models/note.model';

export const noteRoutes = express.Router()

// create a note
noteRoutes.post('/create-note', async (req: Request, res: Response) => {
    const body = req.body;

    const note = await Note.create(body)

    res.status(200).json({
        message: 'successfully created a note',
        note
    })
})

// get note
noteRoutes.get('/', async (req: Request, res: Response) => {
    const notes = await Note.find().populate('user')

    res.status(200).json({
        message: 'successfully get all note',
        notes
    })
})

// get a note
noteRoutes.get('/:id', async (req: Request, res: Response) => {
    const noteID = req.params.id
    const note = await Note.findById(noteID)

    res.status(200).json({
        message: 'successfully get a note',
        note
    })
})

// update a note
noteRoutes.patch('/:id', async (req: Request, res: Response) => {
    const noteID = req.params.id
    const noteBody = req.body
    const note = await Note.findByIdAndUpdate(noteID, noteBody, {new: true})

    res.status(200).json({
        message: 'successfully updated a note',
        note
    })
})

// delete a note
noteRoutes.delete('/delete-note/:id', async (req: Request, res: Response) => {
    const noteID = req.params.id
    const note = await Note.findByIdAndDelete(noteID)

    res.status(200).json({
        message: 'successfully delete a note',
        note
    })
})