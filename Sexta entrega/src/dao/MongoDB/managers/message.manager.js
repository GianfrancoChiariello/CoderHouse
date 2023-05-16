import {messageModel} from '../models/message.model.js'

export default class message {
    constructor() {
        console.log("message constructor start")
    }

    getAll = async () => {
        const mensajes = messageModel.find()
        return mensajes
    }

    newMessage = async (body) => {
        const message = messageModel.create(body)
        return message
    }
}