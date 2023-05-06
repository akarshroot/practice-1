const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render("index", {name : "Abc"})
})

app.get('/arr', (req, res) => {
    res.render("arr", {arr : ["ele1", "ele2", "ele3"]})
})

app.listen(3000, (req, res) => {
    console.log("server started!")
})