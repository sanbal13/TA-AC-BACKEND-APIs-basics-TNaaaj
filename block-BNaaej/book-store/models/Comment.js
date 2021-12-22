const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema =  new Schema({
    content: {type: String, required: true},
    bookId: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
}, {timestamp: true});

module.exports = mongoose.model("Comment", commentSchema);