const express = require('express');
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const auth = require('../middlewares/auth')

const expController = require("../controllers/expController")

router.post("/:dateId",auth.validateToken,errorHandler(expController.expPost)); // refectoring:더미 방문 횟수 확인 방법 추가 필요
router.get("/",auth.validateToken,errorHandler(expController.expList));
router.get("/:dateId",errorHandler(expController.expNum));
router.delete("/:expId",auth.validateToken,errorHandler(expController.expDelete));


module.exports = {
    router,
};