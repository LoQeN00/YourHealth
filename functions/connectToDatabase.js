const mongoose = require('mongoose')

const connectToDatabase = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          },()=>console.log('Zmienione connect'));
    } catch(e) {
        console.log(e)
    }
}

module.exports = connectToDatabase