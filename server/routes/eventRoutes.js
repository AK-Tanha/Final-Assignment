// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents
} = require('../controllers/eventController');

const protect = require('../middleware/auth');

const eventValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('location').notEmpty().withMessage('Location is required'),
];

// Routes
router.get('/mine', protect, getMyEvents);          // ✅ Get events by current user
router.route('/')
  .get(getEvents)                                  // ✅ Get all events
  .post(protect, eventValidation, createEvent);    // ✅ Create new event

router.route('/:id')
  .get(getEventById)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent); // This is correct!


module.exports = router;
