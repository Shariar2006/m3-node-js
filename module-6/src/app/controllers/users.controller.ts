import express, { Request, Response } from 'express'
import { User } from '../models/users.model';
import { z } from 'zod';

export const userRoutes = express.Router()

const createUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
    email: z.string(),
    password: z.string(),
})

// create a user
userRoutes.post('/create-user', async (req: Request, res: Response) => {
    try {
        // const body = await createUserZodSchema.parseAsync(req.body);
        const body = req.body;

        // instance method 
        // const user = new User(body)
        // const password = await user.hashPassword(body.password)
        // user.password = password
        // user.save()

        // static method 
        // custom static method
        const password = await User.hashPassword(body.password)
        body.password = password
        // builtin static
        const user = await User.create(body)

        res.status(200).json({
            message: 'successfully created a user',
            user
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
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
    const user = await User.findByIdAndUpdate(userID, userBody, { new: true })

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