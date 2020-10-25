const User = require('../models/User')
const getSteps = require('../functions/getSteps')

const updateSteps = async(token,userEmail) => {
    const user = await User.findOne({
        email: userEmail
    })
    
    const created = user.created

    const stepPoints = await getSteps(1, created, Date.now(), token)

    let userSteps
    
    try {
        userSteps = stepPoints[0].reduce((acc,num)=>acc+num)
    } catch {
        userSteps = 0
    }

    return userSteps
}


module.exports = updateSteps