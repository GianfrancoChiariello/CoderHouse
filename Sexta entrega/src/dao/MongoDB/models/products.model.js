import mongoose from "mongoose";

const productsCollection = 'products'

const productsSchema = mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

export const productsModel = mongoose.model(productsCollection, productsSchema)