import express from "express";
import Events from "../models/Events.js";
import Attended from "../models/Attended.js";
import authenticate from "../middleware/Authenticate.js";

const router = express.Router();

// Create new event
router.post("/create", authenticate, async (req, res) => {
  try {
    const { username, email, eventName, eventType, eventDate, location, capacity } = req.body;
    
    const newEvent = await Events.create({
      username,
      email,
      eventName,
      eventType,
      eventDate,
      location,
      capacity,
      createdBy: req.user.id
    });

    res.status(201).json({ 
      message: "Event created successfully", 
      event: newEvent 
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event" });
  }
});

// Get All Events
router.get("/all", async (req, res) => {
  try {
    const events = await Events.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Get User's Events
router.get("/user", authenticate, async (req, res) => {
  try {
    const events = await Events.find({ createdBy: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user events" });
  }
});

// Get Single Event Details
router.get("/:id", async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event details:", error);
    res.status(500).json({ message: "Error fetching event details" });
  }
});

// Register for an Event
router.post("/:id/register", authenticate, async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is already registered
    const existingRegistration = await Attended.findOne({
      userId: req.user.id,
      eventId: event._id
    });

    if (existingRegistration) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    // Check event capacity
    const registeredCount = await Attended.countDocuments({ eventId: event._id });
    if (registeredCount >= event.capacity) {
      return res.status(400).json({ message: "Event is at full capacity" });
    }

    // Create registration
    await Attended.create({
      userId: req.user.id,
      eventId: event._id,
      eventName: event.eventName,
      date: event.eventDate,
      location: event.location
    });

    res.json({ message: "Successfully registered for event" });
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({ message: "Error registering for event" });
  }
});

// Get User's Registered Events
router.get("/registered/me", authenticate, async (req, res) => {
  try {
    const registeredEvents = await Attended.find({ userId: req.user.id })
      .populate('eventId')
      .sort({ date: 1 });
    res.json(registeredEvents);
  } catch (error) {
    console.error("Error fetching registered events:", error);
    res.status(500).json({ message: "Error fetching registered events" });
  }
});

export default router;