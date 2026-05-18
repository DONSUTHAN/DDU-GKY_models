const express = require('express')
const app = express()
 
// const cors = require('cors')
// const authRoutes = require("./Routes/")
// const ProductRoutes = require('./Routes/ProductRoute')
// const orderRoutes = require("./Routes/orderRoutes")
const connectDB = require('./config/db')

// dotenv.config();
connectDB()

// const BlogRoutes = require('./Routes/BlogRoutes')
// app.use(cors());
app.use(express.json())
// app.use('/blog',BlogRoutes)

// app.get("/", (req, res) => {
//   res.send("API Running...");
// });

// app.use("/api/auth", authRoutes);

// app.use("/api/products", productRoutes);

// app.use("/api/orders", orderRoutes);

const port = 3000

app.listen(port,()=>{
    console.log("server connected");
    
})