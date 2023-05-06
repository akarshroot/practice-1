const express = require('express')
const app = express()
const route = require('./routes/auth.js')

app.use('/login', route)

app.listen(3000, (req,res) => {
    console.log("Server started!")
})