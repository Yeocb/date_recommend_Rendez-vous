const dateDao = require('../models/dateDao');
const randNum = require('../utils/randNum')

const postDate = async (name, location, mainImg, userId, opentime, closetime, description) => {
    const dateNameLocationCheck = await dateDao.dateNameLocationCheck(name, location);
    const dateLocationCHeck = await dateDao.dateLocationCheck(location);
    if (dateNameLocationCheck) {
        const err = new Error("중복된 정보입니다.")
        err.statusCode = 409;
        throw err}
    else if(dateLocationCHeck) {
        const err = new Error("다른 이름으로 등록된 장소입니다.")
        err.statusCode = 409;
        throw err};
    const postDate = await dateDao.postDate(name, location, mainImg, userId, opentime, closetime, description);
    return postDate;
};

const postCategory = async (categoryId) => {
    const categoryCheck = await dateDao.categoryCheck(categoryId);
    if (categoryCheck) {
        const err = new Error("중복된 카테고리입니다.");
        err.statusCode = 409;
        throw err;
    };
    const postCategory = await dateDao.postCategory(categoryId);
    return postCategory;
};

const getDateList = async () => {
    return await dateDao.getList();
};

const recommendDate = async(location, categoryId) => {
    return await dateDao.recommendDate(location, categoryId);
};

const recommendManyDate = async(location, categoryId, location2, categoryId2, location3, categoryId3) => {
    let recommendDate;
    if (location && categoryId && location2 && categoryId2 && location3 && categoryId3) recommendDate = [await dateDao.recommendDate(location, categoryId), await dateDao.recommendDate(location2, categoryId2), await dateDao.recommendDate(location3, categoryId3)];
    else if (location && categoryId && location2 && categoryId2) recommendDate = [await dateDao.recommendDate(location, categoryId), await dateDao.recommendDate(location2, categoryId2)];
    else if (location && categoryId) recommendDate = await dateDao.recommendDate(location, categoryId);
    return recommendDate;
};

const recommendRandom = async() => {
    let randdate = [];
    for (let i = 0; i < randNum.randNum; i++) {
        date = await dateDao.recommendRandom()
        randdate.push(date)
    }
    return randdate;
};

const updateDate = async(dateId, name, location, description, opentime, closetime) => {
    return await dateDao.updateDate(dateId, name, location, description, opentime, closetime)
};

const deleteCategory = async(dateId, categoryId) => {
    return await dateDao.deleteCategory(dateId, categoryId);
};

const deleteDate = async(dateId) => {
    await dateDao.deleteDate(dateId);
    await dateDao.deleteAllCategory(dateId);
};

module.exports = {
    postDate,
    postCategory,
    getDateList,
    recommendDate,
    recommendManyDate,
    recommendRandom,
    updateDate,
    deleteCategory,
    deleteDate
};
