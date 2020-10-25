const mongoose = require('mongoose')

const connectToDatabase = async (url) => {
    // try {
    //     await mongoose.connect(url, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useFindAndModify: false,
    //         useCreateIndex: true,
    //       },()=>console.log('Zmienione connect'));
    // } catch(e) {
    //     console.log(e)
    // }

    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
    mongoose.connection
    .once("open",()=>console.log('Success'))
    .on("error",err=>console.log(err))
}

module.exports = connectToDatabase