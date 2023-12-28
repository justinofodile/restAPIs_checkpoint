const mongoose = require('mongoose')


//Creating schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

//Creating a user model
const User = mongoose.model('User', userSchema)
module.exports = User;