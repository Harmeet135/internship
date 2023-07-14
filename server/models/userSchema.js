
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    price: Number,
    details: String,
    selectedFile: String,
})

module.exports = mongoose.model('users', userSchema);
