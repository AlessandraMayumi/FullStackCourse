const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    publishDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
})

module.exports = mongoose.model('Book', bookSchema)