const User = require('../models/User')
const mongoose = require('mongoose')
const router = require('express').Router()
const checkAchievements = require('../functions/checkAchievements')
const getSteps = require('../functions/getSteps')
const timeZoneOffset = 3600000 * Math.abs(new Date().getTimezoneOffset())/60


router.get('/',async(req,res)=>{

    const user = await User.findOne({
        email: req.user.profile._json.email
    })
    
    const created = user.created

    const stepPoints = await getSteps(1, created-timeZoneOffset, Date.now(), req.user.accessToken)

    let userSteps
    
    try {
        userSteps = stepPoints[0].reduce((acc,num)=>acc+num)
    } catch {
        userSteps = 0
    }

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
            lastLoggedIn: Date.now() + timeZoneOffset,
            steps: insertStepsToDatabase
        }
    )   
})


module.exports = router



