const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();
const Blogroute= require('./routes/blogRoute')

app.use(express.json())
app.use('/',Blogroute)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});