const userService = require("../services/userService");

const signUp = async (req,res) => {
    try{
        const {email, password, name} = req.body;
        await userService.signUp(email, password, name); 
        res.status(201).json({ message: "회원가입이 완료되었습니다." });
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message: err.message });
    }
};

const signIn = async (req,res) => {
    try{
        const {email, password} = req.body;
        const accessToken = await userService.signIn(email, password);
        res.status(201).json({ accessToken: accessToken, message : "로그인이 완료되었습니다." })
    } catch (err) {
        res
        .status(err.statusCode ? err.statusCode : 400)
        .json({ message : err.message });
    }
};

module.exports = {
    signUp,
    signIn,
};