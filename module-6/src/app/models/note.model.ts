import { Schema, model } from "mongoose"
import { INote } from "../interface/note.interface"

const noteSchema = new Schema<INote>({
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
})

export const Note = model("Note", noteSchema)