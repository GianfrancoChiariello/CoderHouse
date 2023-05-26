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
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            }
        ],
        default: [],
    }
})

cartSchema.pre(['find','findOne'], function() {
    this.populate('productos')
})

export const cartModel = mongoose.model(cartColecction, cartSchema)