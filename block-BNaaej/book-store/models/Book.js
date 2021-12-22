const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema =  new Schema({
    title: {type: String, required: true},
    description: String,
    price: Number,
    categories: [{type: String}],
    author: {type: String, required: true},
    commentId: [{type: Schema.Types.ObjectId, ref:'Comment'}],
}, { timestamp: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

