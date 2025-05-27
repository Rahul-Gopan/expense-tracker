const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory'],
        trim: true
    },
    userName: {
        type: String,
        required: [true, 'Username is mandatory'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is mandatory']
    }

}, {timeStamps: true });

module.exports = mongoose.model('User', UserSchema);