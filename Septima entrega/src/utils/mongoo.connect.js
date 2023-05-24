import mongoose from "mongoose"

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://GChiariello:HacknCYMbuFN37CB@mybase.njpijon.mongodb.net/')
        console.log("Mongo connect sucess")
    } catch (e) {
        console.log(e,"error")
    }
}


export default connect