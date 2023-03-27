const expService = require("../services/expService");
const AppError = require("../middlewares/appError");

const expPost = async(req,res) => {
    const {userId} = req.user;
    const {dateId} = req.params;
    await expService.expPost(userId, dateId);
    res.status(201).json({ message: "방문하였습니다." });
};

const expList = async(req,res) => {
    const {userId} = req.user;
    const list = await expService.expList(userId);
    res.status(201).json(list);
};

const expNum = async(req,res) => {
    const {dateId} = req.params;
    const num = await expService.expNum(dateId);
    res.status(201).json(num);
};

const expDelete = async(req,res) => {
    const {expId} = req.params;
    const {userId} = req.user;
    console.log(expId,userId)
    await expService.expDelete(expId,userId);
    res.status(201).json({ message: "방문기록을 삭제하였습니다." });
};

module.exports = {
    expPost,
    expList,
    expNum,
    expDelete,
};