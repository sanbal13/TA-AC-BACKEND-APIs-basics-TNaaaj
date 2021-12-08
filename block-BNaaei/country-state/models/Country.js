const mongoose = require('mongoose');

const { Schema } = mongoose;

const countrySchema = new Schema({
  name: String,
  states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
  continent: String,
  population: Number,
  ethnicity: String,
  neighbouring_countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
  area: Number,
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
