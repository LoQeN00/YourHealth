const User = require('../models/User')
const mongoose = require('mongoose')
const router = require('express').Router()
const checkAchievements = require('../functions/checkAchievements')
const timeZoneOffset = 3600000 * Math.abs(new Date().getTimezoneOffset())/60
const updateSteps = require('../functions/updateSteps')


router.get('/',async(req,res)=>{

    const userSteps = await updateSteps(req.user.accessToken,req.user.profile._json.email)

    const insertStepsToDatabase = userSteps

    let userAchievements = await checkAchievements(insertStepsToDatabase)

    let userAchivementMap = userAchievements.map(item=>item.params.message)

    res.json({
        userAchievements:userAchivementMap,
        steps:insertStepsToDatabase
    })
    

    userAchievements.length = 0


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



