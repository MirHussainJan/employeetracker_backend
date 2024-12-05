const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [
    {
      title: { type: String, required: true },
      description: { type: String },
      status: { type: String, enum: ['pending', 'done', 'backlog'], default: 'pending' },
    },
  ],
});

module.exports = mongoose.model('Team', teamSchema);
