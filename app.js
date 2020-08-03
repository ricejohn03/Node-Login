const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 8000

//middlware
app.use(express.json())

// Connect to Mongo DB
mongoose.connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

}).then(() => console.log("Database is connected"))

// Routes
const SignUpRoute = require('./routes/usersignup')
const SignInRoute = require('./routes/usersignin')
const AuthRoute = require('./routes/protect')


app.get('/', (req, res) => { res.send("Main Page") })
app.use('/api', SignUpRoute)
app.use('/api', SignInRoute)
app.use('/api', AuthRoute)


app.listen(PORT, () => console.log(`The Server is Runnin on PORT: ${PORT}`))