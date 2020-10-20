const router = require('express').Router()
const isNotLoggedIn = require('../functions/isNotLoggedIn')
const getSteps = require('../functions/getSteps')

router.get('/',isNotLoggedIn,async (req,res)=> {

    const steps24Data = await getSteps(10, Date.now() - 86400000, Date.now(), req.user.accessToken)
    let steps24
    try {
        steps24 = steps24Data.reduce((acc,num)=>acc+num)
    }   catch(e) {
        steps24 = 'Nie ma danych'
    }
    

    res.render('dashboard',{
        name: req.user.profile.displayName,
        email: req.user.profile._json.email,
        picture: req.user.profile._json.picture,
        steps24 : steps24
    })
})

module.exports = router
