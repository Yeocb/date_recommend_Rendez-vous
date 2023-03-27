const reviewService = require("../services/reviewService");
const AppError = require("../middlewares/appError");

const reviewPost = async (req,res) => {
    const {dateId} = req.params;
    const {userId, name} = req.user;
    const {review, stars} = req.body;
    if(!review || !stars) throw new AppError("필수 정보를 입력하지 않았습니다.", 400);
    await reviewService.reviewPost(userId, dateId, review, stars);
    res.status(201).json({ message: "리뷰가 등록되었습니다."});
};

const reviewList = async (req,res) => {
    const {dateId} = req.params;
    const reviewList = await reviewService.reviewList(dateId);
    res.status(201).json(reviewList);
};

const loginReviewList = async (req,res) => {
    const {userId} = req.user;
    const {dateId} = req.params;
    const loginReviewList = await reviewService.loginReviewList(userId, dateId);
    res.status(201).json(loginReviewList);
};

const userReviewList = async (req,res) => {
    const {userId} = req.user;
    const userReviewList = await reviewService.userReviewList(userId);
    res.status(201).json(userReviewList);
};

const reviewPatch = async (req,res) => {
    const {reviewId} = req.params;
    const {userId} = req.user;
    const {review, stars} = req.body;
    await reviewService.reviewPatch(reviewId, userId, review, stars);
    res.status(201).json({ message: "리뷰가 수정되었습니다."});
}

const reviewDelete = async(req,res) => {
    const {reviewId}= req.params;
    const {userId} = req.user;
    await reviewService.reviewDelete(reviewId, userId);
    res.status(201).json({ message: "해당 리뷰가 삭제되었습니다."});
};

module.exports = {
    reviewPost,
    reviewList,
    loginReviewList,
    userReviewList,
    reviewPatch,
    reviewDelete,
};