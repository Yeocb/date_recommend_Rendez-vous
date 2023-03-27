const { AppDataSource } = require("../models/dataSource");
const AppError = require("../middlewares/appError")

const postDate = async (name, location, mainImg, userId, opentime, closetime, description) => {
    try {
		return await AppDataSource.query(
			`INSERT INTO date(
		    	name, 
            	location, 
            	main_img, 
            	user_id, 
            	opentime, 
            	closetime, 
            	description
			) VALUES (?, ?, ?, ? ,? ,?, ?);
			`,
			[ name, location, mainImg, userId, opentime, closetime, description ]
	  	);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const dateNameLocationCheck = async (name, location) => {
	try {
		const [dateInfoCheck] = await AppDataSource.query(
			`SELECT
				d.name,
				d.location
			FROM date d
			WHERE d.name='${name}' AND d.location='${location}'
			`
		);
		return dateInfoCheck;
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const dateLocationCheck = async (location) => {
	try {
		const [dateLocationCheck] = await AppDataSource.query(
			`SELECT
				d.location
			FROM date d
			WHERE d.location='${location}'
			`
		);
		return dateLocationCheck;
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const postCategory = async (categoryId) => {
	try {
		return await AppDataSource.query(
			`INSERT INTO date_category(
				date_id,
				category_id
			) VALUES (LAST_INSERT_ID(),?)
			`,
			[categoryId]
		)
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const categoryCheck = async (categoryId) => {
	try {
		const [categoryIdCheck] = await AppDataSource.query(
			`SELECT 
				dc.category_id
			FROM date_category dc
			WHERE dc.date_id=(LAST_INSERT_ID()) AND dc.category_id='${categoryId}'
			`
		);
		return categoryIdCheck;
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const getList = async () => {
	try {
		return await AppDataSource.query(
			`SELECT
				d.name,
				d.location,
				JSON_ARRAYAGG(dc.category_id) AS category_id
			FROM date d
			INNER JOIN date_category dc ON dc.date_id = d.id
			GROUP BY d.id
			`
		)
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const recommendDate = async (location, categoryId) => {
	try{
		return await AppDataSource.query(
			`SELECT
				d.id,
				d.name AS '상호명',
				d.location AS '위치',
				d.description AS '키워드',
				(SELECT JSON_ARRAYAGG 
					(dc.category_id) 
				FROM date_category dc
				WHERE dc.date_id = d.id) AS '카테고리'
			FROM date d
			INNER JOIN date_category dc ON dc.date_id = d.id
			WHERE location LIKE '%${location}%'
			AND category_id = '${categoryId}'
			GROUP BY d.id
			ORDER BY RAND() LIMIT 1
			`
		)
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const recommendRandom = async () => {
	try{
		return await AppDataSource.query(
			`SELECT
				d.id,
				d.name AS '상호명',
				d.location AS '위치',
				d.description AS '키워드',
				(SELECT JSON_ARRAYAGG 
					(dc.category_id) 
				FROM date_category dc
				WHERE dc.date_id = d.id) AS '카테고리'
			FROM date d
			INNER JOIN date_category dc ON dc.date_id = d.id
			GROUP BY d.id
			ORDER BY RAND() LIMIT 1
			`
		)
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const updateDate = async (dateId, name, location, description, opentime, closetime) => {
	try{
		return await AppDataSource.query(
			`UPDATE date SET	
				name = ?,
				location = ?,
				description = ?,
				opentime= ?,
				closetime = ?
				WHERE date.id ='${dateId}'
			`,
			[name, location, description, opentime, closetime]
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const deleteCategory = async (dateId, categoryId) => {
	try{
		return await AppDataSource.query(
			`DELETE FROM date_category
				WHERE date_id ='${dateId}' AND category_id ='${categoryId}'
			`,
			[dateId, categoryId]
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const deleteDate = async (dateId) => {
	try{
		return await AppDataSource.query(
			`DELETE FROM date
				WHERE id = '${dateId}'
			`
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

const deleteAllCategory = async (dateId) => {
	try{
		return await AppDataSource.query(
			`DELETE FROM date_category
				WHERE date_id = '${dateId}'
			`
		);
	} catch (err) {
		throw new AppError('INVALID_DATA', 500);
	}
};

module.exports = {
    postDate,
	dateNameLocationCheck,
	dateLocationCheck,
	postCategory,
	categoryCheck,
	getList,
	recommendDate,
	recommendRandom,
	updateDate,
	deleteCategory,
	deleteDate,
	deleteAllCategory
};