const router = require('express').Router()
const isNotLoggedIn = require('../functions/isNotLoggedIn')
const getSteps = require('../functions/getSteps')
const getMotivationQuote = require('../functions/motivationQuote')
const mongoose = require('mongoose')
const User = require('../models/User')
const checkAchievements = require('../functions/checkAchievements')


const timeZoneOffset = 3600000 * Math.abs(new Date().getTimezoneOffset())/60

// achievement
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
        motivationQuoteText,
    })

    const findUser = await User.findOne({
        email: req.user.profile._json.email
    })

    
    if(findUser === null) {
        const user = new User({
            email: req.user.profile._json.email,
            username: req.user.profile.displayName,
            steps: 0,
            created: Date.now() + timeZoneOffset,
            achievements : [],
            lastLoggedIn: Date.now() + timeZoneOffset
        })

        await user.save()
    }
})


router.get('/steps',async(req,res)=> {
    const steps24Data = await getSteps(30, Date.now() - 86400000 - timeZoneOffset, Date.now(), req.user.accessToken)
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


router.get('/achievements',async(req,res)=> {

   

    const user = await User.findOne({
        email: req.user.profile._json.email
    })

    const lastLogged = user.lastLoggedIn

    const stepPoints = await getSteps(1, lastLogged-timeZoneOffset, Date.now(), req.user.accessToken)

    let userSteps

    try {
        userSteps = stepPoints[0].reduce((acc,num)=>acc+num)
    } catch {
        userSteps = 0
    }

    const insertStepsToDatabase = user.steps + userSteps

    const userAchievements = await checkAchievements(insertStepsToDatabase)

    const userAchivementMap = userAchievements.map(item=>item.params.message)

   

    const update = await User.findOneAndUpdate(
        {
            email: req.user.profile._json.email
        },
        {
            lastLoggedIn: Date.now() + timeZoneOffset,
            steps: insertStepsToDatabase
        }
    )
    res.render('achievements',{
        routeName: 'Your Achievments',
        name: req.user.profile.displayName,
        email: req.user.profile._json.email,
        picture: req.user.profile._json.picture,
        userAchivementMap 
    })
})


module.exports = router
