const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: new Date()
  }
});

module.exports = Event = mongoose.model('event', eventSchema);
