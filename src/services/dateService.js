const dateDao = require('../models/dateDao');

const postDate = async (name, location, main_img, user_id, opentime, closetime, description) => {
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
    const postDate = await dateDao.postDate(name, location, main_img, user_id, opentime, closetime, description);
    return postDate;
};

const postCategory = async (category_id) => {
    const categoryCheck = await dateDao.categoryCheck(category_id);
    if (categoryCheck) {
        const err = new Error("중복된 카테고리입니다.");
        err.statusCode = 409;
        throw err;
    };
    const postCategory = await dateDao.postCategory(category_id);
    return postCategory;
};

module.exports = {
    postDate,
    postCategory,
};