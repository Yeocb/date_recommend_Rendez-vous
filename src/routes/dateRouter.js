const express = require('express');
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const auth = require('../middlewares/auth')

const dateController = require("../controllers/dateController")

router.post("/adddate",errorHandler(dateController.postDate))
router.post("/addcategory",errorHandler(dateController.postCategory))
router.get("/list",errorHandler(dateController.getDateList))
router.get("/recommend",errorHandler(dateController.recommendDate))  //지역과 카테고리 하나만 설정가능
//router.get("/recommendmany",errorHandler(dateController.recommendManyDate))  //recommend 3번 반복.
router.get("/randomrecommed",auth.validateToken,errorHandler(dateController.recommendRandom))  // 완전랜덤 추천
router.patch("/:dateId",errorHandler(dateController.updateDate))
router.delete("/updatecategory/:dateId",errorHandler(dateController.deleteCategory))
router.delete("/:dateId",errorHandler(dateController.deleteDate))

module.exports = {
    router,
};