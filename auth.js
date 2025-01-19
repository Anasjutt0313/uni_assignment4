const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });


  const actualToken = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

  try {
    const decoded = jwt.verify(actualToken, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

module.exports = { authenticate, authorize };