import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';


const ticketCollection = 'ticket'

const ticketSchema = new mongoose.Schema({
    id: { type: String, required: true, default: uuidv4() },
    code : {
        type: String,
        required: true,
        default: uuidv4()
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    purchaser: {
        type: String,
        required: true,
        default: "anonimo"
    }
})

export const ticketModel = mongoose.model(ticketCollection, ticketSchema)