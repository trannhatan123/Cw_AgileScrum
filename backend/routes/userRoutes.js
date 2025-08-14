// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");
const { updateUserPassword } = require("../controllers/userController");
// Admin CRUD for users
router.get("/", protect, authorize("admin"), userController.getAllUsers);
router.get("/:id", protect, authorize("admin"), userController.getUserById);
router.post("/", protect, authorize("admin"), userController.createUser);
router.put("/:id", protect, authorize("admin"), userController.updateUser);

router.put("/:id/password", protect, authorize("admin"), updateUserPassword);
router.delete("/:id", protect, authorize("admin"), userController.deleteUser);

module.exports = router;
