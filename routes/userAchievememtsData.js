const User = require('../models/User')
const mongoose = require('mongoose')
const router = require('express').Router()
const checkAchievements = require('../functions/checkAchievements')
const timeZoneOffset = 3600000 * Math.abs(new Date().getTimezoneOffset())/60
const updateSteps = require('../functions/updateSteps')


router.get('/',async(req,res)=>{

    const userSteps = await updateSteps(req.user.accessToken,req.user.profile._json.email)

    const insertStepsToDatabase = userSteps

    const userAchievements = await checkAchievements(insertStepsToDatabase)

    const userAchivementMap = userAchievements.map(item=>item.params.message)

    res.json({
        userAchievements:userAchivementMap,
        steps:insertStepsToDatabase
    })
    
    const update = await User.findOneAndUpdate(
        {
            email: req.user.profile._json.email
        },
        {
            lastLoggedIn: Date.now(),
            steps: insertStepsToDatabase
        }
    )   
})


module.exports = router



