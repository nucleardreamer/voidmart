const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const printit = require(path.join(__dirname, 'printer'))
const fortunes = require(path.join(__dirname, 'fortunes'))
const boons = require(path.join(__dirname, 'boons'))

const port = process.env.PORT || 8080

app.use(express.static(
    path.join(__dirname, 'public')
))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', async (req, res) => {
    res.render('index', {
        GLITCH_MIN: process.env.GLITCH_MIN || 500,
        GLITCH_MAX: process.env.GLITCH_MAX || 1500,
        GLITCH_DELAY: process.env.GLITCH_DELAY || 60,
        GLITCH_COUNT: process.env.GLITCH_COUNT || 7,
        REFRESH_TIMER: process.env.REFRESH_TIMER || 60000,
        ENABLE_GLITCH: process.env.ENABLE_GLITCH || 'false',
        BOONS: boons,
        DEV: process.env.NODE_ENV === 'production' ? '' : 'dev'
    })
})

app.post('/printit', async (req, res) => {
    let name = req.body.name
    let fortune = fortunes()
    printit(name, fortune)
    console.log('Printing', name, fortune)
    res.json({
        name, fortune
    })
})


app.get('/fortune', async (req, res) => {
    res.send(fortunes())
})


app.listen(port, () => {
  console.log(`* started on port: ${port}`)
})