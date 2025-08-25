require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const ApiRoutes = require('./routes/ApiRoutes')
const {connectDB} = require('./DB/databaseConnection')
const app = express()

const PORT = process.env.PORT

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api',ApiRoutes)

app.listen(PORT,()=>{
     connectDB()
    console.log(`server is running on port http://localhost:${PORT}`)
})
