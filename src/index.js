const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

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
        refreshTimer: process.env.REFRESH_TIMER || 30000,
        dev: process.env.NODE_ENV === 'production' ? '' : 'dev'
    })
})

app.listen(port, () => {
  console.log(`* started on port: ${port}`)
})
