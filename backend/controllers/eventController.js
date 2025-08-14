// controllers/eventController.js
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Event = require("../models/Event");

// GET all events (public)
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 }).lean();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

// GET event by slug (public)
exports.getEventBySlug = async (req, res, next) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug }).lean();
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

// GET event by ID (admin)
exports.getEventById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const event = await Event.findById(id).lean();
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

// CREATE new event (admin)
exports.createEvent = async (req, res, next) => {
  try {
    const data = { ...req.body };
    // Handle image upload
    if (req.file) {
      data.imageUrl = `/uploads/${req.file.filename}`;
    }
    const newEvent = new Event(data);
    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// UPDATE event (admin)
exports.updateEvent = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Save previous snapshot to history (if schema includes history)
    if (Array.isArray(event.history)) {
      event.history.push({
        title: event.title,
        date: event.date,
        description: event.description,
        imageUrl: event.imageUrl,
        updatedAt: new Date(),
      });
    }

    // Update fields
    event.title = req.body.title ?? event.title;
    event.date = req.body.date ?? event.date;
    event.description = req.body.description ?? event.description;

    // Handle new image upload
    if (req.file) {
      if (event.imageUrl) {
        const oldPath = path.join(__dirname, '../uploads', path.basename(event.imageUrl));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      event.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await event.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE event (admin)
exports.deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Delete image file if exists
    if (event.imageUrl) {
      const filePath = path.join(__dirname, '../uploads', path.basename(event.imageUrl));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Event.deleteOne({ _id: id });
    res.json({ message: "Event deleted" });
  } catch (err) {
    next(err);
  }
};
