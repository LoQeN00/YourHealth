const axios = require('axios')

const getSteps = async (durationMins, startTime, endTime, token)=>{
    const steps_arr = []
    const date_arr = []


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
                endTimeMillis: endTime+7200000
            }
        })
    
        for(const dataSet of steps.data.bucket){
            for(const points of dataSet.dataset){
                for(const data of points.point){
                    steps_arr.push(data.value[0].intVal)
                    const date = new Date(data.startTimeNanos/1000000)
                    const date_h = date.getHours()
                    let date_min = date.getMinutes()
                    if(date_min < 10) date_min = `0${date_min}`
                    const date_y = date.getFullYear()
                    const date_mon = date.getMonth() +1
                    const date_d = date.getDate()
                   
                    date_arr.push([`${date_d}.${date_mon}.${date_y}`,`${date_h}:${date_min}`])
                    
                }
            }
        }

        return {steps_arr, date_arr}

}   catch(e){
        return "Nie ma danych do wyświetlenia"
}

}


module.exports = getSteps