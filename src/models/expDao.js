const { AppDataSource } = require("../models/dataSource");
const AppError = require("../middlewares/appError")

const expPost = async (userId, dateId) => {
    try {
		return await AppDataSource.query(
			`INSERT INTO experience(
		    	user_id,
                date_id
			) VALUES (?, ?);
			`,
			[userId, dateId]
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const expList = async (userId) => {
    try {
		return await AppDataSource.query(
			`SELECT DISTINCT
                e.id,
                d.name,
                (SELECT COUNT(*)
                FROM experience e
                WHERE e.date_id = d.id AND e.user_id= '${userId}' 
                ) AS "방문횟수"
            FROM experience e
            INNER JOIN date d ON e.date_id = d.id
            WHERE e.user_id= '${userId}' 
			`
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const expNum = async (dateId) => {
    try {
		return await AppDataSource.query(
			`SELECT DISTINCT
                d.name,
                (SELECT COUNT(*)
                FROM experience e
                WHERE e.date_id = d.id
                ) AS "방문횟수"
            FROM experience e
            INNER JOIN date d ON e.date_id = d.id
            WHERE e.date_id= '${dateId}' 
			`
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const expDelete = async (expId, userId) => {
    try {
		return await AppDataSource.query(
			`DELETE 
            FROM experience e
            WHERE e.id= '${expId}' AND e.user_id= '${userId}'
			`
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
}; 

module.exports = {
    expPost,
    expList,
    expNum,
    expDelete,
};