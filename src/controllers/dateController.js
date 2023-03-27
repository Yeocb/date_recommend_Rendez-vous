const dateService = require('../services/dateService');
const AppError = require("../middlewares/appError");

const postDate = async (req,res) => {
    const {name, location, mainImg, userId, opentime, closetime, description} = req.body;
    if ( !name || !location || !userId || !description) throw new AppError("필수 정보를 입력하지 않았습니다.", 400);
    await dateService.postDate(name, location, mainImg, userId, opentime, closetime, description);
    res.status(201).json({ message: "데이트장소가 등록되었습니다." });
};

const postCategory = async (req,res) => {
    const {categoryId} = req.body;
    await dateService.postCategory(categoryId);
    res.status(201).json({ message: "카테고리가 등록되었습니다." });
};

const getDateList = async (req,res) => {
    const datelist = await dateService.getDateList();
    res.status(200).json(datelist);
};

const recommendDate = async (req,res) => {
    const {location, categoryId} = req.query;
    if(!location || !categoryId) throw new AppError("필수 정보를 입력하지 않았습니다.", 400);
    const recommend = await dateService.recommendDate(location, categoryId);
    res.status(200).json(recommend);
};

const recommendManyDate = async (req,res) => {
    const {location, categoryId, location2, categoryId2, location3, categoryId3} = req.query;
    if(!location || !categoryId) throw new AppError("필수 정보를 입력하지 않았습니다.", 400);
    const recommendMany = await dateService.recommendManyDate(location, categoryId, location2, categoryId2,location3, categoryId3);
    res.status(200).json(recommendMany);
};

const recommendRandom = async (req,res) => {
    const randomrecommed = await dateService.recommendRandom();
    res.status(200).json(randomrecommed);
};

const updateDate = async (req,res) => {
    const { dateId }= req.params;
    const { name, location, description, opentime, closetime} = req.body;
    await dateService.updateDate(dateId, name, location, description, opentime, closetime);
    res.status(201).json({ message: "정보가 수정되었습니다."});
};

const deleteCategory = async(req,res) => {
    const { dateId } = req.params;
    const { categoryId } = req.body;
    await dateService.deleteCategory(dateId,categoryId);
    res.status(201).json({ message: "해당 카테고리가 삭제되었습니다."});
};

const deleteDate = async(req,res) => {
    const { dateId }= req.params;
    await dateService.deleteDate(dateId);
    res.status(201).json({ message: "해당 데이트장소가 삭제되었습니다."});
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