// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  location: String,
  description: String,
  category: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = mongoose.model('Event', eventSchema);
