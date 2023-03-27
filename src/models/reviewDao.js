const { AppDataSource } = require("./dataSource");
const AppError = require("../middlewares/appError")

const reviewPost = async (userId, dateId, review, stars) => {
    try {
		return await AppDataSource.query(
			`INSERT INTO reviews(
		    	user_id, 
            	date_id, 
            	review, 
            	stars
			) VALUES (?, ?, ?, ?);
			`,
			[ userId, dateId, review, stars ]
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const reviewList = async (dateId) => {
	try{
		return await AppDataSource.query(
			`SELECT
				r.review,
				r.stars,
				DATE_FORMAT(r.created_at, "%y.%m.%e") as day
			FROM reviews r
			INNER JOIN date d ON d.id = r.date_id
			WHERE date_Id = '${dateId}'
			`
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const myReview = async (userId, dateId) => {
	try{
		return await AppDataSource.query(
			`SELECT
				r.review,
				r.stars,
				DATE_FORMAT(r.created_at, "%y.%m.%e") as day
			FROM reviews r
			WHERE date_Id = '${dateId}' AND user_Id = '${userId}'
			ORDER BY r.created_at desc
			`
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const exceptMyReview = async (userId, dateId) => {
	try{
		return await AppDataSource.query(
			`SELECT
				r.review,
				r.stars,
				DATE_FORMAT(r.created_at, "%y.%m.%e") as day
			FROM reviews r
			WHERE date_Id = '${dateId}' AND NOT user_Id = '${userId}'
			ORDER BY r.created_at desc
			`
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const userReviewList = async (userId) => {
	try{
		return await AppDataSource.query(
			`SELECT
				r.review,
				r.stars,
				DATE_FORMAT(r.created_at, "%y.%m.%e") as day
			FROM reviews r
			WHERE user_Id = '${userId}'
			`
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const reviewPatch = async (reviewId, userId, review, stars) => {
    try {
		return await AppDataSource.query(
			`UPDATE reviews SET
			review = ?,
			stars = ?
			WHERE id = '${reviewId}' AND user_id = '${userId}'
			`,
			[review, stars ]
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const reviewDelete = async (reviewId, userId) => {
	try{
		return await AppDataSource.query(
			`DELETE FROM reviews
				WHERE id = '${reviewId}' AND user_id = '${userId}'
			`
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

module.exports = {
    reviewPost,
	reviewList,
	myReview,
	exceptMyReview,
	userReviewList,
	reviewPatch,
	reviewDelete
};