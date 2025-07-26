const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/routes')
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.error(err)
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/todoapp" , router)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})