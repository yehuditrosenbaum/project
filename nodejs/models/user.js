const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: {
        type: String,
        default: "x@x.com",
        require: true
    },
    password: {
        type: String,
        minlength: 2
    },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
    ],
    historyPosts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
    ]
})

module.exports = mongoose.model('User', userSchema);