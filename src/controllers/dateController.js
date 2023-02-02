const dateService = require('../services/dateService')

const postDate = async (req,res) => {
    try{
        const {name, location, main_img, user_id, opentime, closetime, description} = req.body;
        if ( !name || !location || !user_id || !description) {
            return res.status(400).json({ message: "필수정보를 입력하시지 않았습니다." });
            };
        await dateService.postDate(name, location, main_img, user_id, opentime, closetime, description);
        res.status(201).json({ message: "데이트장소가 등록되었습니다." });
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
};

const postCategory = async (req,res) => {
    try{
        const {category_id} = req.body;
        await dateService.postCategory(category_id);
        res.status(201).json({ message: "카테고리가 등록되었습니다." });
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
};

module.exports = {
    postDate,
    postCategory,
};