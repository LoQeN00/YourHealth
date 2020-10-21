const router = require('express').Router()
const isNotLoggedIn = require('../functions/isNotLoggedIn')
const getSteps = require('../functions/getSteps')
const getMotivationQuote = require('../functions/motivationQuote')
const getSleep = require('../functions/getSleep')


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
})




router.get('/steps',async(req,res)=> {

    const steps24Data = await getSteps(30, Date.now() - 86400000, Date.now(), req.user.accessToken)
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

router.get('/sleep',async(req,res)=> {

    let sleepData
    try{
    sleepData = await getSleep(Date.now() - 86400000, Date.now(), req.user.accessToken)
    }
    catch (e){
        console.log(e)
        sleepData = "Nie ma danych"
    }

    console.log(sleepData)


    res.render('sleep',{
        routeName: 'Sleep',
        name: req.user.profile.displayName,
        email: req.user.profile._json.email,
        picture: req.user.profile._json.picture,
    })
})

module.exports = router
