const { AppDataSource } = require("../models/dataSource");
const AppError = require("../middlewares/appError")

const userSignUp = async (email, password, name) => {
    try {
		return await AppDataSource.query(
		`INSERT INTO users(
		    email,
		    password,
            name
		) VALUES (?, ?, ?);
		`,
		[ email, password, name ]
	  );
	} catch (err) {
		throw new AppError("INVALID_DATA_INPUT", 500);
	}
};

const emailCheck = async (email) => {
	try {
		return await AppDataSource.query(
			`SELECT*
			FROM users u
			WHERE u.email = '${email}'
			`
		);
	} catch (err) {
		throw new AppError("INVALID_DATA_INPUT", 500);
	}
};


const userSignIn = async (email) => {
	try {
		const [userInfo] = await AppDataSource.query(
			`SELECT*
			FROM users u
			WHERE u.email = '${email}'
			`
		);
		return userInfo;
	} catch (err) {
		throw new AppError("INVALID_DATA_INPUT", 500);
	}
};

module.exports = {
    userSignUp,
    emailCheck,
	userSignIn,
};