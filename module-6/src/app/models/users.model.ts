import { Schema, model } from "mongoose"
import { IUser } from "../interface/user.interface"

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'subAdmin'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
},
{
    versionKey: false,
    timestamps: true
})

export const User = model("User", userSchema)