const express = require('express');
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const auth = require('../middlewares/auth')

const reviewController = require("../controllers/reviewController")

router.post("/:dateId",auth.validateToken,errorHandler(reviewController.reviewPost)); 
router.get("/list",auth.validateToken,errorHandler(reviewController.userReviewList));
router.get("/login/:dateId",auth.validateToken,errorHandler(reviewController.loginReviewList));
router.get("/:dateId",errorHandler(reviewController.reviewList));
router.patch("/:reviewId",auth.validateToken,errorHandler(reviewController.reviewPatch));
router.delete("/:reviewId",auth.validateToken,errorHandler(reviewController.reviewDelete));

module.exports = {
    router,
};