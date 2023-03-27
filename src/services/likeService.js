const likeDao = require('../models/likeDao');
const AppError = require('../middlewares/appError')

const likePost = async (userId, dateId) => {
    const likeCheck = await likeDao.likeCheck(userId, dateId)

    let like
    if( Object.values(likeCheck[0]) == 1) like = await likeDao.likeDelete(userId, dateId);
    else if( Object.values(likeCheck[0]) == 0) like = await likeDao.likePost(userId, dateId);

    const likeAfter = await likeDao.likeCheck(userId, dateId);
    const result = Object.values(likeAfter[0]);
    return result;
};

const likeNumber = async (dateId) => {
    return await likeDao.likeNumber(dateId);
};

const likeList = async (userId) => {
    return await likeDao.likeList(userId);
};

module.exports = {
    likePost,
    likeNumber,
    likeList
};