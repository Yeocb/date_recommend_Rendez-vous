const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AppError = require("../middlewares/appError")
const { validateEmail, validatePassword } = require("../utils/validations");

const userDao = require("../models/userDao")

const signUp = async (email, password, name) => {
    validateEmail(email);
    validatePassword(password);

    const emailCheck = await userDao.emailCheck(email);
    if (emailCheck) throw new AppError("중복된 이메일입니다.", 400);
    const hashedPassword = await bcrypt.hash(password, 10);
    const signup = await userDao.userSignUp(email, hashedPassword, name);
    return signup;
};

const signIn = async (email, password) => {
    const user = await userDao.userSignIn(email);
    if (!user) throw new AppError("존재하지 않는 이메일입니다.", 400);
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) throw new AppError("올바르지 않는 비밀번호입니다.", 400);
    return jwt.sign({ userId: user.id, email: user.email, name: user.name }, process.env.TOKEN_SECRET);
};

module.exports = {
    signUp,
    signIn,
}