import express, { Request, Response } from 'express'
import { User } from '../models/users.model';

export const userRoutes = express.Router()

// create a user
userRoutes.post('/create-user', async (req: Request, res: Response) => {
    const body = req.body;

    const user = await User.create(body)

    res.status(200).json({
        message: 'successfully created a user',
        user
    })
})

// get user
userRoutes.get('/', async (req: Request, res: Response) => {
    const users = await User.find()

    res.status(200).json({
        message: 'successfully get all user',
        users
    })
})

// get a user
userRoutes.get('/:id', async (req: Request, res: Response) => {
    const userID = req.params.id
    const user = await User.findById(userID)

    res.status(200).json({
        message: 'successfully get a user',
        user
    })
})

// update a user
userRoutes.patch('/:id', async (req: Request, res: Response) => {
    const userID = req.params.id
    const userBody = req.body
    const user = await User.findByIdAndUpdate(userID, userBody, {new: true})

    res.status(200).json({
        message: 'successfully updated a user',
        user
    })
})

// delete a user
userRoutes.delete('/delete-user/:id', async (req: Request, res: Response) => {
    const userID = req.params.id
    const user = await User.findByIdAndDelete(userID)

    res.status(200).json({
        message: 'successfully delete a user',
        user
    })
})