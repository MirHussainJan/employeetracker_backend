const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  imageUrl: {
    type: String,
    default: 'https://example.com/default-profile.png', // Replace with your default image URL
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Team', teamSchema);
