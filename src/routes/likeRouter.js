const express = require('express');
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const auth = require('../middlewares/auth')

const likeController = require("../controllers/likeController")

router.post("/:dateId",auth.validateToken,errorHandler(likeController.likePost));
router.get("/number/:dateId",errorHandler(likeController.likeNumber));
router.get("/",auth.validateToken,errorHandler(likeController.likeList));

module.exports = {
    router,
};