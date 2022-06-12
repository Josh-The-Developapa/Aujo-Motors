const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  photo: {
    type: String,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  stripe: {
    type: String,
  }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
