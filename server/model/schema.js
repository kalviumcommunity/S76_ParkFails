const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userAvatar: { type: String, default: '/assets/react.svg' },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userAvatar: { type: String, default: '/assets/react.svg' },
  timestamp: { type: Date, default: Date.now },
  caption: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);
