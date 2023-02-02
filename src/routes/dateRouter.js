const express = require('express');
const router = express.Router();

const dateController = require("../controllers/dateController")

router.post("/adddate",dateController.postDate)
router.post("/addcategory",dateController.postCategory)

module.exports = {
    router,
};