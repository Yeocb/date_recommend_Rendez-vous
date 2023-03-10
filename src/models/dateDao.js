const { AppDataSource } = require("../models/dataSource");

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
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const dateNameLocationCheck = async (name, location) => {
	const [dateInfoCheck] = await AppDataSource.query(
		`SELECT
			d.name,
			d.location
		FROM date d
		WHERE d.name='${name}' AND d.location='${location}'
		`
	);
	return dateInfoCheck;
};

const dateLocationCheck = async (location) => {
	const [dateLocationCheck] = await AppDataSource.query(
		`SELECT
			d.location
		FROM date d
		WHERE d.location='${location}'
		`
	);
	return dateLocationCheck;
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
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const categoryCheck = async (categoryId) => {
    const [categoryIdCheck] = await AppDataSource.query(
        `SELECT 
			dc.category_id
		FROM date_category dc
		WHERE dc.date_id=(LAST_INSERT_ID()) AND dc.category_id='${categoryId}'
        `
    );
    return categoryIdCheck;
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
		console.log(err);
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const recommendDate = async (location, categoryId) => {
	try{
		return await AppDataSource.query(
			`SELECT
				d.id,
				d.name AS '?????????',
				d.location AS '??????',
				d.description AS '?????????',
				(SELECT JSON_ARRAYAGG 
					(dc.category_id) 
				FROM date_category dc
				WHERE dc.date_id = d.id) AS '????????????'
			FROM date d
			INNER JOIN date_category dc ON dc.date_id = d.id
			WHERE location LIKE '%${location}%'
			AND category_id = '${categoryId}'
			GROUP BY d.id
			ORDER BY RAND() LIMIT 1
			`
		)
	} catch (err) {
		const error = new Error(err,'INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const recommendRandom = async () => {
	try{
		return await AppDataSource.query(
			`SELECT
				d.id,
				d.name AS '?????????',
				d.location AS '??????',
				d.description AS '?????????',
				(SELECT JSON_ARRAYAGG 
					(dc.category_id) 
				FROM date_category dc
				WHERE dc.date_id = d.id) AS '????????????'
			FROM date d
			INNER JOIN date_category dc ON dc.date_id = d.id
			GROUP BY d.id
			ORDER BY RAND() LIMIT 1
			`
		)
	} catch (err) {
		const error = new Error(err,'INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const updateDate = async (dateId, name, location, description, opentime, closetime) => {
	try{
		return await AppDataSource.query(
			`UPDATE date
				SET	name = ?,
					location = ?,
					description = ?,
					opentime= ?,
					closetime = ?
				WHERE date.id ='${dateId}'
			`,
			[name, location, description, opentime, closetime]
		);
	} catch (err) {
		const error = new Error(err,'INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
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
		const error = new Error(err,'INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
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
		const error = new Error(err,'INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
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
		const error = new Error(err,'INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
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