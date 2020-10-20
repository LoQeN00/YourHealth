const router = require('express').Router()
const axios = require('axios')
const getSteps = require('../functions/getSteps')

router.get('/',async (req,res)=> {

    const token = req.user.accessToken

    const steps24 = await getSteps(30, Date.now() - 86400000, Date.now(),  token)
    const {steps_arr,date_arr} = steps24
    console.log(date_arr)
    
    
    res.json({
        success: true,
        steps_arr: steps_arr,
        date_arr: date_arr
    })
})



module.exports  = router

