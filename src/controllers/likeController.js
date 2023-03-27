const likeService = require("../services/likeService");
const AppError = require("../middlewares/appError");

const likePost = async (req,res) => {
    const {dateId} = req.params;
    const {userId} = req.user;
    const like = await likeService.likePost(userId, dateId);
    if(like[0] == 0) throw new AppError("좋아요를 취소했습니다.", 201);
    res.status(201).json({ message: "좋아요"})
};

const likeNumber = async (req,res) => {
    const {dateId} = req.params;
    const likeNum = await likeService.likeNumber(dateId);
    res.status(201).json(likeNum)
}

const likeList = async (req,res) => {
    const {userId} = req.user;
    const likeList = await likeService.likeList(userId);
    res.status(201).json(likeList)
}

module.exports = {
    likePost,
    likeNumber,
    likeList,
}