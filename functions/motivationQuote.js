const axios = require('axios')


const getMotivationQuote = async () => {
    const data = await axios({
        method: "GET",
        url: "https://type.fit/api/quotes"
    })

    return data
}



module.exports = getMotivationQuote




