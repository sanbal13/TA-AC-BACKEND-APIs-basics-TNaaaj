const mongoose = require('mongoose');

const { Schema } = mongoose;

const stateSchema = new Schema({
  name: String,
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  population: Number,
  area: Number,
  neighbouring_states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
});

const State = mongoose.model('State', stateSchema);
module.exports = State;
