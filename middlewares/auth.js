const jwt = require("jsonwebtoken");
const User = require("../models/user"); 
const secret = process.env.SECRET;

async function auth(req, res, next) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found or deleted" });
    }

    req.user = { id: user._id }; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = auth;
