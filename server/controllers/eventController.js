// controllers/eventController.js
const Event = require('../models/Event');
const { validationResult } = require('express-validator');

// Create Event
exports.createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const event = await Event.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(event);
  } catch (err) {
    console.error("Event creation failed:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Optional: Ensure only creator can update
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this event' });
    }

    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }

    await event.deleteOne(); // or event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Delete failed:', err.message);
    res.status(500).json({ error: 'Server error while deleting event' });
  }
};


// Get Events Created by Logged-in User
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id }).populate('createdBy', 'username');
    res.json(events);
  } catch (err) {
    console.error('Failed to fetch user events:', err.message);
    res.status(500).json({ error: 'Failed to fetch user events' });
  }
};
