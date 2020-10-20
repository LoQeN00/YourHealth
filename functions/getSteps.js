const axios = require('axios')

const getSteps = async (durationMins, startTime, endTime, token)=>{
    const steps_arr = []

    startTime -= 7200000

    try{
        const steps = await axios({
            method: "POST",
            headers: {
                authorization: "Bearer "+token
            },
            "Content-Type":"application/json",
            url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
            data: {
                aggregateBy : [
                    {
                        dataTypeName : "com.google.step_count.delta",
                        dataSourceId : "derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas"
                    }
                ],
                bucketByTime: {
                    durationMillis: (durationMins*60*1000) // Co ile zliczać
                },
                startTimeMillis: startTime, //Od kiedy
                endTimeMillis: endTime
            }
        })
    
        for(const dataSet of steps.data.bucket){
            for(const points of dataSet.dataset){
                for(const data of points.point){
                    steps_arr.push(data.value[0].intVal)
                }
            }
        }

        return steps_arr

}   catch(e){
        return "Nie ma danych do wyświetlenia"
}

}


module.exports = getSteps