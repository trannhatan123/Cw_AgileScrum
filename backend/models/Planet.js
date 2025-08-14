// models/Planet.js

const mongoose = require("mongoose");
const slugify = require("slugify");

const PlanetHistorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    radius: Number,
    mass: Number,
    distanceFromSun: Number,
    orbitalPeriod: Number,
    rotationPeriod: Number,
    averageTemperature: Number,
    numOfMoons: Number,
    imageUrl: String,
    textureUrl: String,
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const PlanetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },

    // --- Mới: phân biệt planet và dwarf planets ---
    type: {
      type: String,
      enum: ["planet", "dwarf"],
      default: "planet"
    },

    radius: {
      type: Number,
      default: 0
    },
    mass: {
      type: Number,
      default: 0
    },
    distanceFromSun: {
      type: Number,
      default: 0
    },
    orbitalPeriod: {
      type: Number,
      default: 0
    },
    rotationPeriod: {
      type: Number,
      default: 0
    },
    averageTemperature: {
      type: Number,
      default: null
    },
    numOfMoons: {
      type: Number,
      default: 0
    },
    imageUrl: {
      type: String,
      default: ""
    },
    textureUrl: {
      type: String,
      default: ""
    },

    // --- Các trường đã có cho PlanetDetail page ---
    exploration: [
      {
        missionName: { type: String },
        launchDate: { type: Date },
        description: { type: String },
        imageUrl: { type: String },
        link: { type: String }
      }
    ],
    resources: [
      {
        title: { type: String },
        url: { type: String },
        type: { type: String } // e.g. "video", "document", "pdf"
      }
    ],
    news: [
      {
        title: { type: String },
        url: { type: String },
        publishedAt: { type: Date },
        summary: { type: String }
      }
    ],
    gallery: [
      String
    ],

    // Lưu lịch sử thay đổi
    history: [
      PlanetHistorySchema
    ]
  },
  {
    timestamps: true
  }
);

// Tự động sinh slug từ name, đảm bảo không trùng
PlanetSchema.pre("validate", async function (next) {
  if (this.name) {
    let newSlug = slugify(this.name, { lower: true, strict: true });
    const existing = await this.constructor.findOne({
      slug: newSlug,
      _id: { $ne: this._id }
    });
    if (existing) {
      // nếu slug đã tồn tại, thêm timestamp để đảm bảo duy nhất
      newSlug = `${newSlug}-${Date.now()}`;
    }
    this.slug = newSlug;
  }
  next();
});

module.exports = mongoose.model("Planet", PlanetSchema);
