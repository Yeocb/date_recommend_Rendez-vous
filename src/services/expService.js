const expDao = require('../models/expDao');
const AppError = require('../middlewares/appError')

const expPost = async (userId, dateId) => {
    await expDao.expPost(userId, dateId);
};

const expList = async (userId) => {
   return await expDao.expList(userId);
};

const expNum = async (dateId) => {
    return await expDao.expNum(dateId);
 };

 const expDelete = async (expId, userId) => {
    return await expDao.expDelete(expId, userId);
 };

module.exports = {
    expPost,
    expList,
    expNum,
    expDelete,
};