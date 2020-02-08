const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  feedback: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Feedback = mongoose.model('feedback', feedbackSchema);
