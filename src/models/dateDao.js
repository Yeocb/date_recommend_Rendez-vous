const { AppDataSource } = require("../models/dataSource");

const postDate = async (name, location, main_img, user_id, opentime, closetime, description) => {
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
			[ name, location, main_img, user_id, opentime, closetime, description ]
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

const postCategory = async (category_id) => {
	try {
		return await AppDataSource.query(
			`INSERT INTO date_category(
				date_id,
				category_id
			) VALUES (LAST_INSERT_ID(),?)
			`,
			[category_id]
		)
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const categoryCheck = async (category_id) => {
    const [categoryId] = await AppDataSource.query(
        `SELECT 
			dc.category_id
		FROM date_category dc
		WHERE dc.date_id=(LAST_INSERT_ID()) AND dc.category_id='${category_id}'
        `
    );
    return categoryId;
};

module.exports = {
    postDate,
	dateNameLocationCheck,
	dateLocationCheck,
	postCategory,
	categoryCheck
};