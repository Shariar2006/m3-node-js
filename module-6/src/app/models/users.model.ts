import { Model, Schema, model } from "mongoose"
import { IHashPassword, IUser } from "../interface/user.interface"
import bcrypt from 'bcryptjs'

const userSchema = new Schema<IUser, Model<IUser>, IHashPassword> ({
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

userSchema.method("hashPassword", async function(plainPassword){
    const password = await bcrypt.hash(plainPassword, 10)
    return password
})

export const User = model("User", userSchema)