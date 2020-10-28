const router = require('express').Router()
const isNotLoggedIn = require('../functions/isNotLoggedIn')
const getSteps = require('../functions/getSteps')
const getMotivationQuote = require('../functions/motivationQuote')
const mongoose = require('mongoose')
const User = require('../models/User')
const timeZoneOffset = 3600000 * Math.abs(new Date().getTimezoneOffset())/60
const compare = require('../functions/compare')
const updateSteps = require('../functions/updateSteps')

router.get('/',isNotLoggedIn,async (req,res)=> {

    const motivationQuoteData = await getMotivationQuote()

    const randomIndex = Math.floor(Math.random()*motivationQuoteData.data.length)
    
    const motivationQuoteText = motivationQuoteData.data[randomIndex].text
    const motivationQuoteAuthor = motivationQuoteData.data[randomIndex].author

   
    
    res.render('dashboard',{
        routeName: 'Dashboard',
        name: req.user.profile.displayName,
        email: req.user.profile._json.email,
        picture: req.user.profile._json.picture,
        motivationQuoteAuthor,
        motivationQuoteText
    })

    
    const findUser = await User.findOne({
        email: req.user.profile._json.email
    })

    
    if(findUser === null) {
        const user = new User({
            email: req.user.profile._json.email,
            username: req.user.profile.displayName,
            steps: 0,
            created: Date.now(),
            achievements : [],
            lastLoggedIn: Date.now() 
        })

        await user.save()
    }
})


router.get('/steps',isNotLoggedIn,async(req,res)=> {

    const steps24Data = await getSteps(30, Date.now() - 86400000 - 3600000 , Date.now(), req.user.accessToken)

    let steps24
    try {
        const steps_arr = steps24Data[0]
        steps24 = steps_arr.reduce((acc,num)=>acc+num)
        
    }   catch(e) {
        steps24 = 'Nie ma danych'
    }

    res.render('steps',{
        routeName: 'Steps Counter',
        name: req.user.profile.displayName,
        email: req.user.profile._json.email,
        picture: req.user.profile._json.picture,
        steps24 : steps24
    })
})


router.get('/achievements',isNotLoggedIn,async(req,res)=> {

    res.render('achievements',{
        routeName: 'Achievements',
        name: req.user.profile.displayName,
        email: req.user.profile._json.email,
        picture: req.user.profile._json.picture
    })
})

router.get('/leadboard',isNotLoggedIn,async(req,res)=>{

    const userSteps = await updateSteps(req.user.accessToken,req.user.profile._json.email)

    const insertStepsToDatabase = userSteps

    const update = await User.findOneAndUpdate(
        {
            email: req.user.profile._json.email
        },
        {
            lastLoggedIn: Date.now(),
            steps: insertStepsToDatabase
        }
    )   

   
    const allUsersData = await User.find()

    const sortedLeaderboard = allUsersData.sort(compare)


    res.render('leadboard',{
        routeName: 'Leaderboard',
        name: req.user.profile.displayName,
        email: req.user.profile._json.email,
        picture: req.user.profile._json.picture,
        sortedLeaderboard
    })
})


router.get('/diet',(req,res)=> {
    res.send(`This feature will be in future   <a href='/dashboard'>Back</a>`)
})


router.get('/authors',(req,res)=> {
    res.render('authors',{
        routeName: 'Authors',
        name: req.user.profile.displayName,
        email: req.user.profile._json.email,
        picture: req.user.profile._json.picture,
    })

})


module.exports = router
