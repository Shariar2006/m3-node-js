import { Model, Schema, model } from "mongoose"
import { UserInstanceMethod, IUser, UserStaticMethod } from "../interface/user.interface"
import bcrypt from 'bcryptjs'
import { Note } from "./note.model"

const userSchema = new Schema<IUser, UserStaticMethod, UserInstanceMethod> ({
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

userSchema.static("hashPassword", async function(plainPassword){
    const password = await bcrypt.hash(plainPassword, 10)
    return password
})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.post("save", function(doc){
console.log(doc)
})

userSchema.post("findOneAndDelete", async function(doc, next) {
    if(doc){
        await Note.deleteMany({user: doc._id})
    }
    next()
})

export const User = model<IUser, UserStaticMethod>("User", userSchema)