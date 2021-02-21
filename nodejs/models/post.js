const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
        default: '101'
    },
    id: {
        type: Number,
        require: true,
        default: 10
    },
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }

})

module.exports = mongoose.model('Post', postSchema);