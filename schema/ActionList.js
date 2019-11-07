const mongoose = require('mongoose');

const ActionListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isComplete: {
    type: Boolean,
    default: false
  }
});

module.exports = ActionList = mongoose.model('action-list', ActionListSchema);
