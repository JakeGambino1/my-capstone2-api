const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      user: {
        type: String
      }
    }
  ],
  date: {
    type: String,
    default: Date.now
  },
  isNewPost: {
    type: Boolean,
    default: false
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
