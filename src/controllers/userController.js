const userService = require("../services/userService");
const AppError = require('../middlewares/appError');

const signUp = async (req,res) => {
    const {email, password, name} = req.body;
    if(!email || !password)  throw new AppError("필수 정보를 입력하지 않았습니다.", 400);
    await userService.signUp(email, password, name); 
    res.status(201).json({ message: "회원가입이 완료되었습니다." });
};

const signIn = async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password)  throw new AppError("필수 정보를 입력하지 않았습니다.", 400);
    const accessToken = await userService.signIn(email, password);
    res.status(201).json({ accessToken: accessToken, message : "로그인이 완료되었습니다." })
};

module.exports = {
    signUp,
    signIn,
};