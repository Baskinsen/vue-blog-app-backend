const mongoose = require('mongoose')
const Schema = mongoose.Schema  

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        match: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    },
    email: {
        type:String,
        required: true,
        // match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true
    }

}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)