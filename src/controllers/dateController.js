const dateService = require('../services/dateService')

const postDate = async (req,res) => {
    try{
        const {name, location, mainImg, userId, opentime, closetime, description} = req.body;
        if ( !name || !location || !userId || !description) {
            return res.status(400).json({ message: "필수정보를 입력하시지 않았습니다." });
            };
        await dateService.postDate(name, location, mainImg, userId, opentime, closetime, description);
        res.status(201).json({ message: "데이트장소가 등록되었습니다." });
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
};

const postCategory = async (req,res) => {
    try{
        const {categoryId} = req.body;
        await dateService.postCategory(categoryId);
        res.status(201).json({ message: "카테고리가 등록되었습니다." });
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
};

const getDateList = async (req,res) => {
    const datelist = await dateService.getDateList();
    res.status(200).json(datelist);
};

const recommendDate = async (req,res) => {
    try{
        const {location, categoryId} = req.query;
        if(!location || !categoryId) {
            return res.status(400).json({ message: "필수정보를 입력하시지 않았습니다." });
        };
        const recommend = await dateService.recommendDate(location, categoryId);
        res.status(200).json(recommend);
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
};

const recommendManyDate = async (req,res) => {
    try{
        const {location, categoryId, location2, categoryId2, location3, categoryId3} = req.query;
        if(!location || !categoryId) {
            return res.status(400).json({ message: "필수정보를 입력하시지 않았습니다." });
        };
        const recommendMany = await dateService.recommendManyDate(location, categoryId, location2, categoryId2,location3, categoryId3);
        res.status(200).json(recommendMany);
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
};

const recommendRandom = async (req,res) => {
    const randomrecommed = await dateService.recommendRandom();
    res.status(200).json(randomrecommed);
};

const updateDate = async (req,res) => {
    try{
        const { dateId }= req.params;
        const { name, location, description, opentime, closetime} = req.body;
        await dateService.updateDate(dateId, name, location, description, opentime, closetime);
        res.status(201).json({ message: "정보가 수정되었습니다."});
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
};

const deleteCategory = async(req,res) => {
    try{
        const { dateId } = req.params;
        const { categoryId } = req.body;
        await dateService.deleteCategory(dateId,categoryId);
        res.status(201).json({ message: "해당 카테고리가 삭제되었습니다."});
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
};

const deleteDate = async(req,res) => {
    try{
        const { dateId }= req.params;
        await dateService.deleteDate(dateId);
        res.status(201).json({ message: "해당 데이트장소가 삭제되었습니다."});
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
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