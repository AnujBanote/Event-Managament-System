const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");


const {
  getUserProfile,
  deleteUserAccount,
  updateUserProfile,
} = require("../controllers/user.controller");

router.get("/profile", authMiddleware, getUserProfile);
router.delete("/delete", authMiddleware, deleteUserAccount);

// ✅ This must exist:
router.put("/update", authMiddleware, updateUserProfile);

module.exports = router; 