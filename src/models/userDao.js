const { AppDataSource } = require("../models/dataSource");

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
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const emailCheck = async (email) => {
    const [userEmail] = await AppDataSource.query(
        `SELECT*
         FROM users u
         WHERE u.email = '${email}'
        `
    );
    return userEmail;
};

module.exports = {
    userSignUp,
    emailCheck,
};