const axios = require('axios')
const getSleep = async (startTime, endTime, token)=>{
    const sleep = await axios({
        method: "POST",
        headers: {
            authorization: "Bearer "+token
        },
        "Content-Type":"application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
            aggregateBy : [
                {
                    dataTypeName : "com.google.sleep.segment"
                }
            ],
            startTimeMillis: startTime,
            endTimeMillis: endTime+7200000
        }
    })

    return sleep
}







module.exports = getSleep

