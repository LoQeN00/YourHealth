const mongoose = require('mongoose')

const connectToDatabase = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: false
          },()=>console.log('Succesfully connected to databse'));
    } catch(e) {
        console.log(e)
    }
}

module.exports = connectToDatabase