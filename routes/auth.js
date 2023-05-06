const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
})

router.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
    console.log(req.params.id)
})

module.exports = router