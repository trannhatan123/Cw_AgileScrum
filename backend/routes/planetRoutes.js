// routes/planetRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllPlanets,
  getPlanetBySlug,
  getPlanetById,
  createPlanet,
  updatePlanet,
  deletePlanet,
  getPlanetExploration,
  getPlanetResources,
  getPlanetNews,
  getPlanetGallery,
  getPlanetNews,
  getPlanetHistory, // ← import mới
} = require("../controllers/planetController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { uploadImage } = require("../middleware/uploadImage");

// public
router.get("/", getAllPlanets);
router.get("/slug/:slug", getPlanetBySlug);
router.get("/slug/:slug/exploration", getPlanetExploration);
router.get("/slug/:slug/resources", getPlanetResources);
router.get("/slug/:slug/news", getPlanetNews);
router.get("/slug/:slug/highlights", getPlanetHighlights);
router.get("/slug/:slug/gallery", getPlanetGallery);


// admin CRUD + history
router.post("/", protect, authorize("admin"), uploadImage, createPlanet);
router.get("/:id", protect, authorize("admin"), getPlanetById);
router.put("/:id", protect, authorize("admin"), uploadImage, updatePlanet);
router.delete("/:id", protect, authorize("admin"), deletePlanet);

module.exports = router;
