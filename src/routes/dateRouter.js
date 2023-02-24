const express = require('express');
const router = express.Router();

const dateController = require("../controllers/dateController")

router.post("/adddate",dateController.postDate)
router.post("/addcategory",dateController.postCategory)
router.get("/list",dateController.getDateList)
router.get("/recommend",dateController.recommendDate)  //지역과 카테고리 하나만 설정가능
router.get("/recommendmany",dateController.recommendManyDate)  //recommend 3번 반복.
router.get("/randomrecommed",dateController.recommendRandom)  // 완전랜덤 추천
router.patch("/:dateid",dateController.updateDate)
router.delete("/updatecategory/:dateid",dateController.deleteCategory)

module.exports = {
    router,
};