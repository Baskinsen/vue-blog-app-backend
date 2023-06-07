const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require("dotenv").config()
const app = express()
const blogRouter = require('./routes/blogRoutes')
const userRouter = require('./routes/userRoutes')


const port = process.env.port || 3000

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use((req,res,next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Origin",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})


app.use('/user', userRouter)
app.use('/', blogRouter)


const start = async () => {
     mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
    app.listen(process.env.port, ()=> {
        console.log(`Database is connected`)
        console.log(`Server is running on port ${port}`)
    })
})
}

start()

