import mongoose from "mongoose"

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://GChiariello:iCS35A1iiAbLEIW3@mybase.njpijon.mongodb.net/')
        console.log("Mongo connect sucess")
    } catch (e) {
        console.log(e,"error")
    }
}


export default connect