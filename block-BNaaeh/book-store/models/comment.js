const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema =  new Schema({
    content: {type: String, required: true},
    bookId: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
});

module.exports = mongoose.model("Comment", commentSchema);