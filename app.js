const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connect = require('./DB/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middlware
app.use(express.json())

//router
app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)



PORT = process.env.PORT || 3000
const start = async () => {
    try{
        await connect(process.env.MONGO_URL)
        app.listen(PORT,(req,res)=>{console.log(`server listen on port ${PORT}...`)})
    } catch(err){
        console.log(err)
    }
}

start()


