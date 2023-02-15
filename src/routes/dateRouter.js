const express = require('express');
const router = express.Router();

const dateController = require("../controllers/dateController")

router.post("/adddate",dateController.postDate)
router.post("/addcategory",dateController.postCategory)
router.get("/list",dateController.getDateList)
router.get("/recommend",dateController.recommendDate)  //지역과 카테고리 하나만 설정가능
router.get("/recommendmany",dateController.recommendManyDate)  //recommend 3번 반복.
//완전랜덤추천 갯수도
//지역 카테고리 리스트검색

module.exports = {
    router,
};