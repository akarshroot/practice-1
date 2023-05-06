const http = require('http')
const fs = require('fs').promises
const server = http.createServer(async (req, res) => {
    // const data = await fs.readFile('./views/index.html')
    // res.write(data.toString())
    // res.end()
let path = './views/'
    switch (req.url) {
        case '/':
            // path += index.html;
            const data = await fs.readFile('./views/index.html')
            res.write(data.toString())

            res.end()
            
        case '/change':
            fs.readFile("./views/index.html", (error, content) => {
                fs.writeFile('./views/new.html', content, (error) => {
                    console.log(content.toString())
                })
            })

            const cont = await fs.readFile('./views/new.html')
            res.write(cont.toString())


            res.end()
            break
    }
})

server.listen(3000, () => {
    console.log("Server Started!")
})