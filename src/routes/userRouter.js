const express = require('express');
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");

const userController = require("../controllers/userController");

router.post("/signup", errorHandler(userController.signUp));
router.post("/signin", errorHandler(userController.signIn));

module.exports = {
    router,
};