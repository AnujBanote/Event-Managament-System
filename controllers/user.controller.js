// controllers/user.controller.js
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Add this at the top if not present

const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.json({ message: "✅ Profile updated successfully" });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "❌ Failed to update profile" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "createdAt"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("User profile fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * DELETE /api/user/delete
 * Permanently delete the logged‑in user (and cascade any FK constraints).
 */
const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "✅ Account deleted successfully" });
  } catch (error) {
    console.error("Account deletion error:", error);
    res.status(500).json({ message: "❌ Failed to delete account" });
  }
};

module.exports = {
  getUserProfile,
  deleteUserAccount,
  updateUserProfile, // ✅ Add this line
};
