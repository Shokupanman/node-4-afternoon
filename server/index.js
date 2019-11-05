require('dotenv').config()
let express = require('express')
let session = require('express-session')
let { SERVER_PORT, SESSION_SECRET } = process.env

let checkForSession = require('./middlewares/checkForSession')
let swagController = require('./controllers/swagController')
let authController = require('./controllers/authController')
let cartController = require('./controllers/cartController')
let searchController = require('./controllers/searchController')


let app = express()
app.use(express.json())

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 5
        }
    })
)

app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

app.get('/api/search', searchController.search)

app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)


app.use(checkForSession)
app.get('/api/swag', swagController.read)

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} % chance of brain damage after this course`)
})