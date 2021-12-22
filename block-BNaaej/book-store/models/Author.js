const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: {type: String, required: true},    
});

modules.export = mongoose.model(Author, 'authorSchema');
