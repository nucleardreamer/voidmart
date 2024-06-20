const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Redis = require('ioredis')

const printit = require(path.join(__dirname, 'printer'))
const fortunes = require(path.join(__dirname, 'fortunes'))
const boons = require(path.join(__dirname, 'boons'))

var redis
try {
    redis = new Redis(
        `rediss://default:${process.env.REDIS_PASS}@included-marmot-36127.upstash.io:6379`,
        {
            lazyConnect: true,
            connectTimeout: 5000,
            maxRetriesPerRequest: 3,
            enableOfflineQueue: true,
            retryStrategy(times) {
                const delay = Math.min(times * 50, 10000)
                return (times >= process.env.REDIS_CONNECT_RETRY || 20) ? false : delay
            }
        }
    )
} catch (e) {
    console.log('* Redis conenction error', e)
}

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
    console.log('* Printing:', name, fortune)
    
    try {
        await redis.set(
            Date.now(),
            JSON.stringify({
                name, fortune
            })
        )
    } catch (e) {
        console.log('Redis error', e)
    }

    res.json({
        name, fortune
    })
})


app.get('/fortune', async (req, res) => {
    res.send(fortunes())
})


app.listen(port, async () => {
    try {
        await redis.connect()
        console.log('* Redis connected')
    } catch (err) {
        console.log('* Redis connection error', err)
    }
    console.log(`* Started on port: ${port}`)
})