const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
    try {
        const token = await req.header("Authorization");
        const decoded = await jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "올바른 토큰이 아닙니다." });
    }
};

module.exports = {
  validateToken,
};