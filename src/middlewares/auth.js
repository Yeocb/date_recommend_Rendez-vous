const jwt = require("jsonwebtoken");
const secretKey = process.env.TOKEN_SECRET;

const validateToken = async (req, res, next) => {
    try {
        const token = await req.header("Authorization");
        const decoded = await jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "로그인 정보가 없습니다." });
    }
};

module.exports = {
  validateToken,
};