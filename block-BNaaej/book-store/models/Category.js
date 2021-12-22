let mongoose = require('mongoose');
let { Schema } = mongoose;

const categorySchema = new Schema({
    name: {type: String},  
});

modules.export = mongoose.model('Category', categorySchema);