import { Types } from 'mongoose'
export interface INote {
    title: string,
    content: string,
    category: 'personal' | 'office' | 'other',
    tags: {
        label: string,
        color: string
    },
    user: Types.ObjectId
}