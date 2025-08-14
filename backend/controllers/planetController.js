const fs = require("fs");
const path = require("path");
const Planet = require("../models/Planet");

// Lấy tất cả Planet
exports.getAllPlanets = async (req, res) => {
  try {
    const planets = await Planet.find().sort({ name: 1 });
    res.json(planets);
  } catch (err) {
    res.status(500).json({
      message: "Server error when fetching planets",
      error: err.message,
    });
  }
};

// Lấy theo _id
exports.getPlanetById = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    res.json(planet);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Lấy theo slug
exports.getPlanetBySlug = async (req, res) => {
  try {
    const planet = await Planet.findOne({ slug: req.params.slug });
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    res.json(planet);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Lấy dữ liệu Exploration
exports.getPlanetExploration = async (req, res) => {
  try {
    const planet = await Planet.findOne({ slug: req.params.slug });
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    res.json(planet.exploration);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Lấy dữ liệu Resources
exports.getPlanetResources = async (req, res) => {
  try {
    const planet = await Planet.findOne({ slug: req.params.slug });
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    res.json(planet.resources);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Lấy dữ liệu News
exports.getPlanetNews = async (req, res) => {
  try {
    const planet = await Planet.findOne({ slug: req.params.slug });
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    res.json(planet.news);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getPlanetHighlights = async (req, res) => {
  try {
    const planet = await Planet.findOne({ slug: req.params.slug });
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    // Sắp xếp news theo publishedAt giảm dần, lấy 3 phần tử đầu
    const highlights = planet.news
      .sort((a, b) => b.publishedAt - a.publishedAt)
      .slice(0, 3);
    res.json(highlights);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Lấy dữ liệu Gallery
exports.getPlanetGallery = async (req, res) => {
  try {
    const planet = await Planet.findOne({ slug: req.params.slug });
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    res.json(planet.gallery);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Tạo mới Planet (kèm exploration, resources, news, gallery)
exports.createPlanet = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
      radius: Number(req.body.radius) || 0,
      mass: Number(req.body.mass) || 0,
      distanceFromSun: Number(req.body.distanceFromSun) || 0,
      orbitalPeriod: Number(req.body.orbitalPeriod) || 0,
      rotationPeriod: Number(req.body.rotationPeriod) || 0,
      averageTemperature:
        req.body.averageTemperature !== undefined
          ? Number(req.body.averageTemperature)
          : null,
      numOfMoons: Number(req.body.numOfMoons) || 0,
      exploration: req.body.exploration || [],
      resources: req.body.resources || [],
      news: req.body.news || [],
      gallery: req.body.gallery || [],
    };

    // Nếu có file upload (multer)
    if (req.file) {
      data.imageUrl = `/uploads/${req.file.filename}`;
    }

    const planet = await Planet.create(data);
    res.status(201).json(planet);
  } catch (err) {
    next(err);
  }
};

// Cập nhật Planet (push history, update các trường cũ và mới)
exports.updatePlanet = async (req, res, next) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }

    // Push bản ghi cũ vào history
    planet.history.push({
      name: planet.name,
      description: planet.description,
      radius: planet.radius,
      mass: planet.mass,
      distanceFromSun: planet.distanceFromSun,
      orbitalPeriod: planet.orbitalPeriod,
      rotationPeriod: planet.rotationPeriod,
      averageTemperature: planet.averageTemperature,
      numOfMoons: planet.numOfMoons,
      imageUrl: planet.imageUrl,
      textureUrl: planet.textureUrl,
      exploration: planet.exploration,
      resources: planet.resources,
      news: planet.news,
      gallery: planet.gallery,
      updatedAt: new Date(),
    });

    // Cập nhật các trường cơ bản
    planet.name = req.body.name ?? planet.name;
    planet.description = req.body.description ?? planet.description;
    planet.radius = req.body.radius ?? planet.radius;
    planet.mass = req.body.mass ?? planet.mass;
    planet.distanceFromSun = req.body.distanceFromSun ?? planet.distanceFromSun;
    planet.orbitalPeriod = req.body.orbitalPeriod ?? planet.orbitalPeriod;
    planet.rotationPeriod = req.body.rotationPeriod ?? planet.rotationPeriod;
    planet.averageTemperature =
      req.body.averageTemperature ?? planet.averageTemperature;
    planet.numOfMoons = req.body.numOfMoons ?? planet.numOfMoons;

    // Cập nhật các field mới
    planet.exploration = req.body.exploration ?? planet.exploration;
    planet.resources = req.body.resources ?? planet.resources;
    planet.news = req.body.news ?? planet.news;
    planet.gallery = req.body.gallery ?? planet.gallery;

    // Xử lý xóa ảnh cũ và cập nhật ảnh mới
    if (req.file) {
      if (planet.imageUrl) {
        const oldPath = path.join(
          __dirname,
          "../uploads",
          path.basename(planet.imageUrl)
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      planet.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await planet.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Xóa Planet
exports.deletePlanet = async (req, res, next) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }

    if (planet.imageUrl) {
      try {
        const filePath = path.join(
          __dirname,
          "../uploads",
          path.basename(planet.imageUrl)
        );
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) {
        console.warn("Error deleting file", e.message);
      }
    }

    await Planet.deleteOne({ _id: planet._id });
    res.json({ message: "Planet deleted" });
  } catch (err) {
    next(err);
  }
};
