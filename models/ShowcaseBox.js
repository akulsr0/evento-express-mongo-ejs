const mongoose = require('mongoose');

const showcaseBoxSchema = new mongoose.Schema({
  img1: {
    type: String
  },
  img2: {
    type: String
  },
  img3: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = ShowcaseBox = mongoose.model('showcase', showcaseBoxSchema);
