const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
const hbs = require('hbs')
const path = require('path')
const dashboardRouter = require('./routes/dashboardRouter')
const chartDataRouter = require('./routes/chartDataRouter')
const isLoggedIn = require('./functions/isLoggedIn')
const connectToDatabase = require('./functions/connectToDatabase')


if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


require('./passport-setup')


app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'./templates/views'))
hbs.registerPartials(path.join(__dirname,'./templates/partials'))
app.use(express.static('public'))

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    secret: "SECRET_SIGNING_KEY",
}))


connectToDatabase(process.env.DB_LINK)

app.use(passport.initialize())
app.use(passport.session())



app.get('/',(req,res)=>{
    res.redirect('/login')
})

app.get('/login',isLoggedIn,(req,res)=> {
    res.render('login.hbs')
})

app.get('/google',
  passport.authenticate('google', { scope: ['profile','email','openid','https://www.googleapis.com/auth/fitness.activity.read'],prompt : "select_account"}
))

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/fail' }),
  (req, res)=> {
    res.redirect('/dashboard');
})

app.use('/dashboard',dashboardRouter)
app.use('/chartData',chartDataRouter)

app.get('/fail',(req,res)=>{
    res.send('Wrong login data')
})

app.get('/logout',(req,res)=>{
    req.session = null
    req.logout()
    res.redirect('/login')
})

app.listen(process.env.PORT || 3000,()=>console.log('Dziala'))

