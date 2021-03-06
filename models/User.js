const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:String,
    username: String,
    steps: Number,
    created: Number,
    achievements: Array,
    lastLoggedIn: Number,
})


module.exports = mongoose.model('User',userSchema)