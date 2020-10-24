const mongoose = require('mongoose')

const connectToDatabase = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            
          },()=>console.log('Zmienione connect'));
    } catch(e) {
        console.log(e)
    }
}

module.exports = connectToDatabase