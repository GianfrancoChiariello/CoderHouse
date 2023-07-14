import mongoose from "mongoose"
import config from "../config.js"

const connect = async () => {
    try {
        await mongoose.connect(config.mongoConnection)
        console.log("Mongo connect sucess")
    } catch (e) {
        console.log(e,"error")
    }
}


export default connect
