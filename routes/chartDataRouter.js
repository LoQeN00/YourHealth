const router = require('express').Router()
const axios = require('axios')
const getSteps = require('../functions/getSteps')
const timeZoneOffset = 3600000 * Math.abs(new Date().getTimezoneOffset()) / 60


router.get('/',async (req,res)=> {

    const token = req.user.accessToken

    const steps24 = await getSteps(30, Date.now() - 86400000 - 3600000, Date.now(),  token)
    const [steps24_arr, date24_arr] = steps24
    const steps7d = await getSteps(1440, Date.now() - 604800000 - 3600000, Date.now(), token)
    const [steps7d_arr, date7d_arr] = steps7d
    const steps30d = await getSteps(10080, Date.now() - 2600640000 - 3600000, Date.now(), token)
    const [steps30d_arr, date30d_arr] = steps30d


    
    
    res.json({
        success: true,
        steps24_arr: steps24_arr,
        date24_arr: date24_arr,
        steps7d_arr : steps7d_arr,
        date7d_arr: date7d_arr,
        steps30d_arr : steps30d_arr,
        date30d_arr: date30d_arr,

    })
})



module.exports  = router

