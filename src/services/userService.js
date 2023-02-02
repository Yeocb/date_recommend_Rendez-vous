const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateEmail, validatePassword } = require("../utils/validations");

const userDao = require("../models/userDao")

const signUp = async (email, password, name) => {
    validateEmail(email);
    validatePassword(password);

    const emailCheck = await userDao.emailCheck(email);

    if (emailCheck) {
        const err = new Error("중복된 이메일입니다.");
        err.statusCode = 409;
        throw err;
      }

    const hashedPassword = await bcrypt.hash(password, 10);
    const signup = await userDao.userSignUp(email, hashedPassword, name);
    return signup;
};

const signIn = async (email, password) => {
    const emailCheck = await userDao.emailCheck(email);
    if (!emailCheck) {
        const err = new Error("존재하지않는 이메일입니다.");
        err.statusCode = 409;
        throw err;
    }
    
    const passwordCheck = await bcrypt.compare(password, emailCheck.password);
    if (!passwordCheck) {
        const err = new Error("올바르지 않은 비밀번호입니다.");
        err.statusCode = 400;
        throw err;
    }
    return jwt.sign({ sub: emailCheck.id, email: emailCheck.email }, process.env.TOKEN_SECRET);
};

module.exports = {
    signUp,
    signIn,
}