// models/Event.js
const mongoose = require('mongoose');
const slugify = require('slugify');

// Schema for history entries
const EventHistorySchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  imageUrl: String,
  updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug:  { type: String, required: true, unique: true, lowercase: true, trim: true },
  date:  { type: Date, required: true },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' },

  // Add history array
  history: [EventHistorySchema]
}, { timestamps: true });

EventSchema.pre('validate', async function(next) {
  if (this.title) {
    let newSlug = slugify(this.title, { lower: true, strict: true });
    const existing = await this.constructor.findOne({ slug: newSlug, _id: { $ne: this._id } });
    if (existing) newSlug = `${newSlug}-${Date.now()}`;
    this.slug = newSlug;
  }
  next();
});

module.exports = mongoose.model('Event', EventSchema);
