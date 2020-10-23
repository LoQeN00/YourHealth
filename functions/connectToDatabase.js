const mongoose = require('mongoose')

const connectToDatabase = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          },()=>console.log('Succesfully connected to databse'));
    } catch(e) {
        console.log(e)
    }
}

module.exports = connectToDatabase