const express = require('express')
const app = express()
const session = require("express-session")
const cookie = require('cookie-parser')
const fs = require("fs")

const arr = [
    {
        usn: "admin",
        pwd: "admin"
    },
    {
        usn: "admin1",
        pwd: 'admin1'
    }
]
app.use(cookie())
app.use(session({
    secret: "gsdgbwique87728",
    saveUnitialized: false,
    resave: true,
    cookie: {
        maxAge: 80000
    }
}))
app.use(express.json())
// app.use(express.static(path.join(__dirname, "./views/login.html")))
// app.use(express.static(__dirname + '/views/'))
app.use(express.urlencoded({ extended: true }))
app.use('/dashboard', (req, res, next) => {
    if (req.session.username) {
        next()
    }
    else {
        res.redirect("/getData")
    }
})

// app.use('/user', userRoute)      routing!!

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
    // res.redirect('/login.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html')
})

app.post('/getData', (req, res) => {
    // if(req.body.usn == "admin" && req.body.pwd == "admin"){
    //     res.write("<script>alert('Logged In!')</script>")
    // }
    // res.end()

    const response = arr.filter((data) => {
        if (req.body.usn == data.usn && req.body.pwd == data.pwd) {
            return true;
        }
    })

    if (response.length == 1) {
        req.session.username = req.body.usn;
        res.write("<script>alert('Logged In!')</script>")
    }

    res.end()
})

app.post('/storeData', (req, res) => {
    fs.readFile("./users.json", (err, data) => {
        const users = JSON.parse(data.toString())
        console.log(users);
        const existingUser = users.find(user => user.usn == req.body.username)
        if (existingUser) res.status(400).json({ message: "User already exists." })
        else {
            const newUser = {
                usn: req.body.username,
                pswd: req.body.password
            }
            users.push(newUser)
            fs.writeFile("./users.json", JSON.stringify(users), (err) => {
                res.status(200).json({ message: "User Registered!" })
            })
        }
    })
})

app.listen(3000, (req, res) => {
    console.log(":)")
})