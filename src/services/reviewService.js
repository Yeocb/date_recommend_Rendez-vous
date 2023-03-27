const reviewDao = require('../models/reviewDao');
const AppError = require('../middlewares/appError')

const reviewPost = async (userId, dateId, review, stars) => {
    return await reviewDao.reviewPost(userId, dateId, review, stars);
};

const reviewList = async (dateId) => {
    return await reviewDao.reviewList(dateId);
};

const loginReviewList = async (userId, dateId) => {
    const review = {
        myreview: await reviewDao.myReview(userId, dateId),
        exceptmyreview: await reviewDao.exceptMyReview(userId, dateId)}
    return review;
};

const userReviewList = async (userId) => {
    return await reviewDao.userReviewList(userId);
};

const reviewPatch = async (reviewId, userId, review, stars) => {
    return await reviewDao.reviewPatch(reviewId, userId, review, stars);
};

const reviewDelete = async(reviewId, userId) => {
    return await reviewDao.reviewDelete(reviewId, userId);
};

module.exports = {
    reviewPost,
    reviewList,
    loginReviewList,
    userReviewList,
    reviewPatch,
    reviewDelete
};