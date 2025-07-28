
//authMiddleware
const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate and verify JWT token.
 * Attaches decoded user info to req.user if valid.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided or invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user object to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res
      .status(403)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};

module.exports = authMiddleware; 
 