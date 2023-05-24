import mongoose from 'mongoose'

const cartColecction = 'cart'

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    productos: {
        type: Array,
        default: []
    }
})

export const cartModel = mongoose.model(cartColecction, cartSchema)