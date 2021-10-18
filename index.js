require('dotenv').config()

const express = require('express')

const server = express()
server.use(express.json())

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`listening on ${port}`)
})

server.get("/",(req,res) => {
    res.send(`<h1>Hello there.</h1>
    <h3>Obiwan-Kenobi -</h3>`)
})
//heroku time