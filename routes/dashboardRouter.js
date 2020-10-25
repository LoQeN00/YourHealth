const router = require('express').Router()
const isNotLoggedIn = require('../functions/isNotLoggedIn')
const getSteps = require('../functions/getSteps')
const getMotivationQuote = require('../functions/motivationQuote')
const mongoose = require('mongoose')
const User = require('../models/User')
const timeZoneOffset = 3600000 * Math.abs(new Date().getTimezoneOffset())/60

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
            username: req.user.profile.displayNaame,
            steps: 0,
            created: Date.now() + timeZoneOffset,
            achievements : [],
            lastLoggedIn: Date.now() + timeZoneOffset
        })

        await user.save()
    }

})


router.get('/steps',isNotLoggedIn,async(req,res)=> {
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


router.get('/achievements',isNotLoggedIn,async(req,res)=> {

    res.render('achievements',{
        routeName: 'Achievments',
        name: req.user.profile.displayName,
        email: req.user.profile._json.email,
        picture: req.user.profile._json.picture,
    })
})


module.exports = router
