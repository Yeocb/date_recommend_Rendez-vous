const { AppDataSource } = require("./dataSource");
const AppError = require("../middlewares/appError")

const likePost = async (userId, dateId) => {
    try {
		return await AppDataSource.query(
			`INSERT INTO \`like\` (
		    	user_id,
            	date_id
			) VALUES (?,?);
			`,
			[ userId, dateId]
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const likeCheck = async (userId, dateId) => {
    try {
		return await AppDataSource.query(
			`SELECT EXISTS 
                ( SELECT *
                    FROM \`like\`
                    WHERE user_id= '${userId}' AND date_id= '${dateId}') AS "좋아요"
			`
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const likeDelete = async (userId, dateId) => {
	try{
		return await AppDataSource.query(
			`DELETE FROM \`like\`
            WHERE user_id= '${userId}' AND date_id= '${dateId}'
			`
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const likeNumber = async (dateId) => {
    try {
		return await AppDataSource.query(
			`SELECT COUNT(*) AS "좋아요"
            FROM \`like\`
            WHERE date_id = '${dateId}' 
			`
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const likeList = async (userId) => {
    try {
		return await AppDataSource.query(
			`SELECT
                d.name,
                (SELECT COUNT(*)
                FROM \`like\` l
                WHERE date_id = d.id
                ) AS "좋아요"
            FROM \`like\` l
            INNER JOIN date d ON d.id = l.date_id
            WHERE l.user_id = '${userId}' 
			`
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

module.exports = {
    likePost,
    likeCheck,
    likeDelete,
    likeNumber,
    likeList,
};