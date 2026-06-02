const express = require ('express')
const app = express()

const connectDB = require('./config/db')
connectDB()

const BlogRoutes = require('./Routes/BlogRoutes')

app.use(express.json)
app.use('./blog',BlogRoutes)

const PORT = 3000
app.listen(PORT,() => {
    console.log("server connected")
})