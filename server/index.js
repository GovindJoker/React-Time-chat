const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")
const userRoutes=require('./routes/UserRoutes')

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)

require("dotenv").config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})