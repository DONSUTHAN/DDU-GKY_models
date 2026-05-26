const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoose connection done")
    } catch (error) {
        console.log("error coonecting",error)
    }
}
module.exports = connectDB