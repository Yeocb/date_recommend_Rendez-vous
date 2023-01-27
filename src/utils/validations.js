const validateEmail = (email) => {
    const emailReg = /^[0-9a-zA-Z]([0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

    if (!emailReg.test(email)) {
      const err = new Error("형식에 맞지 않는 이메일입니다.");
      err.statusCode = 400;
      throw err;
    }
  };

const validatePassword = (password) => {
    const passwordReg = /(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/

    if (!passwordReg.test(password)) {
        const err = new Error("형식에 맞지 않는 비밀번호입니다.");
        err.statusCode = 400;
        throw err;
    }
}
  
  module.exports = {
    validateEmail,
    validatePassword,
  };